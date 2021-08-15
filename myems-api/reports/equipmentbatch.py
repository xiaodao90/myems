import falcon
import simplejson as json
import mysql.connector
import config
from anytree import AnyNode, LevelOrderIter
from datetime import datetime, timedelta, timezone
from decimal import Decimal
import excelexporters.equipmentbatch


class Reporting:
    @staticmethod
    def __init__():
        pass

    @staticmethod
    def on_options(req, resp):
        resp.status = falcon.HTTP_200

    ####################################################################################################################
    # PROCEDURES
    # Step 1: valid parameters
    # Step 2: build a space tree
    # Step 3: query all equipments in the space tree
    # Step 4: query energy categories
    # Step 5: query reporting period energy input
    # Step 6: construct the report
    ####################################################################################################################
    @staticmethod
    def on_get(req, resp):
        print(req.params)
        space_id = req.params.get('spaceid')
        reporting_period_start_datetime_local = req.params.get('reportingperiodstartdatetime')
        reporting_period_end_datetime_local = req.params.get('reportingperiodenddatetime')

        ################################################################################################################
        # Step 1: valid parameters
        ################################################################################################################
        if space_id is None:
            raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST', description='API.INVALID_SPACE_ID')
        else:
            space_id = str.strip(space_id)
            if not space_id.isdigit() or int(space_id) <= 0:
                raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST', description='API.INVALID_SPACE_ID')
            else:
                space_id = int(space_id)

        timezone_offset = int(config.utc_offset[1:3]) * 60 + int(config.utc_offset[4:6])
        if config.utc_offset[0] == '-':
            timezone_offset = -timezone_offset

        if reporting_period_start_datetime_local is None:
            raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST',
                                   description="API.INVALID_REPORTING_PERIOD_START_DATETIME")
        else:
            reporting_period_start_datetime_local = str.strip(reporting_period_start_datetime_local)
            try:
                reporting_start_datetime_utc = datetime.strptime(reporting_period_start_datetime_local,
                                                                 '%Y-%m-%dT%H:%M:%S')
            except ValueError:
                raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST',
                                       description="API.INVALID_REPORTING_PERIOD_START_DATETIME")
            reporting_start_datetime_utc = reporting_start_datetime_utc.replace(tzinfo=timezone.utc) - \
                timedelta(minutes=timezone_offset)

        if reporting_period_end_datetime_local is None:
            raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST',
                                   description="API.INVALID_REPORTING_PERIOD_END_DATETIME")
        else:
            reporting_period_end_datetime_local = str.strip(reporting_period_end_datetime_local)
            try:
                reporting_end_datetime_utc = datetime.strptime(reporting_period_end_datetime_local,
                                                               '%Y-%m-%dT%H:%M:%S')
            except ValueError:
                raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST',
                                       description="API.INVALID_REPORTING_PERIOD_END_DATETIME")
            reporting_end_datetime_utc = reporting_end_datetime_utc.replace(tzinfo=timezone.utc) - \
                timedelta(minutes=timezone_offset)

        if reporting_start_datetime_utc >= reporting_end_datetime_utc:
            raise falcon.HTTPError(falcon.HTTP_400, title='API.BAD_REQUEST',
                                   description='API.INVALID_REPORTING_PERIOD_END_DATETIME')

        cnx_system_db = mysql.connector.connect(**config.myems_system_db)
        cursor_system_db = cnx_system_db.cursor(dictionary=True)

        cursor_system_db.execute(" SELECT name "
                                 " FROM tbl_spaces "
                                 " WHERE id = %s ", (space_id,))
        row = cursor_system_db.fetchone()

        if row is None:
            if cursor_system_db:
                cursor_system_db.close()
            if cnx_system_db:
                cnx_system_db.disconnect()
            raise falcon.HTTPError(falcon.HTTP_404, title='API.NOT_FOUND',
                                   description='API.SPACE_NOT_FOUND')
        else:
            space_name = row['name']

        ################################################################################################################
        # Step 2: build a space tree
        ################################################################################################################

        query = (" SELECT id, name, parent_space_id "
                 " FROM tbl_spaces "
                 " ORDER BY id ")
        cursor_system_db.execute(query)
        rows_spaces = cursor_system_db.fetchall()
        node_dict = dict()
        if rows_spaces is not None and len(rows_spaces) > 0:
            for row in rows_spaces:
                parent_node = node_dict[row['parent_space_id']] if row['parent_space_id'] is not None else None
                node_dict[row['id']] = AnyNode(id=row['id'], parent=parent_node, name=row['name'])

        ################################################################################################################
        # Step 3: query all equipments in the space tree
        ################################################################################################################
        equipment_dict = dict()
        space_dict = dict()

        for node in LevelOrderIter(node_dict[space_id]):
            space_dict[node.id] = node.name

        cursor_system_db.execute(" SELECT e.id, e.name AS equipment_name, s.name AS space_name, "
                                 "        cc.name AS cost_center_name, e.description "
                                 " FROM tbl_spaces s, tbl_spaces_equipments se, "
                                 " tbl_equipments e, tbl_cost_centers cc "
                                 " WHERE s.id IN ( " + ', '.join(map(str, space_dict.keys())) + ") "
                                 "       AND se.space_id = s.id AND se.equipment_id = e.id "
                                 "       AND e.cost_center_id = cc.id  ", )
        rows_equipments = cursor_system_db.fetchall()
        if rows_equipments is not None and len(rows_equipments) > 0:
            for row in rows_equipments:
                equipment_dict[row['id']] = {"equipment_name": row['equipment_name'],
                                             "space_name": row['space_name'],
                                             "cost_center_name": row['cost_center_name'],
                                             "description": row['description'],
                                             "values": list()}

        ################################################################################################################
        # Step 4: query energy categories
        ################################################################################################################
        cnx_energy_db = mysql.connector.connect(**config.myems_energy_db)
        cursor_energy_db = cnx_energy_db.cursor()

        # query energy categories in reporting period
        energy_category_set = set()
        cursor_energy_db.execute(" SELECT DISTINCT(energy_category_id) "
                                 " FROM tbl_equipment_input_category_hourly "
                                 " WHERE start_datetime_utc >= %s AND start_datetime_utc < %s ",
                                 (reporting_start_datetime_utc, reporting_end_datetime_utc))
        rows_energy_categories = cursor_energy_db.fetchall()
        if rows_energy_categories is not None or len(rows_energy_categories) > 0:
            for row_energy_category in rows_energy_categories:
                energy_category_set.add(row_energy_category[0])

        # query all energy categories
        cursor_system_db.execute(" SELECT id, name, unit_of_measure "
                                 " FROM tbl_energy_categories "
                                 " ORDER BY id ", )
        rows_energy_categories = cursor_system_db.fetchall()
        if rows_energy_categories is None or len(rows_energy_categories) == 0:
            if cursor_system_db:
                cursor_system_db.close()
            if cnx_system_db:
                cnx_system_db.disconnect()

            if cursor_energy_db:
                cursor_energy_db.close()
            if cnx_energy_db:
                cnx_energy_db.disconnect()

            raise falcon.HTTPError(falcon.HTTP_404,
                                   title='API.NOT_FOUND',
                                   description='API.ENERGY_CATEGORY_NOT_FOUND')
        energy_category_list = list()
        for row_energy_category in rows_energy_categories:
            if row_energy_category['id'] in energy_category_set:
                energy_category_list.append({"id": row_energy_category['id'],
                                             "name": row_energy_category['name'],
                                             "unit_of_measure": row_energy_category['unit_of_measure']})

        ################################################################################################################
        # Step 5: query reporting period energy input
        ################################################################################################################
        for equipment_id in equipment_dict:

            cursor_energy_db.execute(" SELECT energy_category_id, SUM(actual_value) "
                                     " FROM tbl_equipment_input_category_hourly "
                                     " WHERE equipment_id = %s "
                                     "     AND start_datetime_utc >= %s "
                                     "     AND start_datetime_utc < %s "
                                     " GROUP BY energy_category_id ",
                                     (equipment_id,
                                      reporting_start_datetime_utc,
                                      reporting_end_datetime_utc))
            rows_equipment_energy = cursor_energy_db.fetchall()
            for energy_category in energy_category_list:
                subtotal = Decimal(0.0)
                for rows_equipment_energy in rows_equipment_energy:
                    if energy_category['id'] == rows_equipment_energy[0]:
                        subtotal = rows_equipment_energy[1]
                        break
                equipment_dict[equipment_id]['values'].append(subtotal)

        if cursor_system_db:
            cursor_system_db.close()
        if cnx_system_db:
            cnx_system_db.disconnect()

        if cursor_energy_db:
            cursor_energy_db.close()
        if cnx_energy_db:
            cnx_energy_db.disconnect()

        ################################################################################################################
        # Step 6: construct the report
        ################################################################################################################
        equipment_list = list()
        for equipment_id, equipment in equipment_dict.items():
            equipment_list.append({
                "id": equipment_id,
                "equipment_name": equipment['equipment_name'],
                "space_name": equipment['space_name'],
                "cost_center_name": equipment['cost_center_name'],
                "description": equipment['description'],
                "values": equipment['values'],
            })

        result = {'equipments': equipment_list,
                  'energycategories': energy_category_list}

        # export result to Excel file and then encode the file to base64 string
        result['excel_bytes_base64'] = \
            excelexporters.equipmentbatch.export(result,
                                                 space_name,
                                                 reporting_period_start_datetime_local,
                                                 reporting_period_end_datetime_local)
        resp.body = json.dumps(result)
