# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
### Added
-   None.

### Changed
-   None.

### Fixed
-   None.

### Removed
-   None.

## [v1.4.0] -   2021-11-14
### Added
-   added installation on docker to myems-modbus-tcp.

### Changed
-   Merged expression table into virtual meter table in database.
    NOTE: THIS CHANGE MAY BREAK YOUR SYSTEM.
    
    Upgrade procedure for this change:
    1. Stop the myems-normalization service or container.
    2. Backup your database.
    3. Upgrade myems/admin, myems/myems-api, and myems/myems-normalization source code, 
       and keep previous .env files unchanged.
    4. Run database/upgrade/upgrade1.4.0.sql to merge expression into virtual meter
    5. Check the virtual meters in Admin UI.
    6. Start the myems-normalization service or container.

-   updated virtual meter model view in admin ui
-   updated docker hub address in README
-   updated excel exporters to make them print friendly
-   added access control to actions of user in api

### Fixed
-   fixed issue in on_delete of gateway in API
-   upgraded falcon framework to v3.0.1 in API to fix warnings

### Removed
-   None.

## [v1.3.4] -   2021-11-06
### Added
-   added notification drop down list and notification page.
-   added new period type 'weekly'.
-   added installation on docker to README.

### Changed
-   updated Dockerfiles.
-   added default gateway token to database and myems_modbus_tcp

### Fixed
-   fixed NoneType errors in detailed data formatters of Web UI.

### Removed
-   None.

## [v1.3.3] -   2021-10-30
### Added
-   added missing rule_id in myems_fdd_db.

### Changed
-   updated package.json in web ui
-   updated README and database test procedure
-   added validation of offline meter hourly values to myems-normalization service
-   updated offline meter data template file
-   added new period type 'weekly' to meterenergy and aggregate_hourly_data_by_period in API
-   updated comments in aggregate_hourly_data_by_period of API
-   updated myems-api installation.

### Fixed
-   fixed NoneType error in myems-cleaning service
-   fixed warnings in myems-aggregation service
-   fixed detailed data sort issues in Web UI

### Removed
-   removed duplicate entry in i18n of Web UI
-   removed unused import from API.

## [v1.3.2] -   2021-10-22
### Added
-   added associated equipments data to combinedequipmentefficiency report.
-   added Pie Charts of TCE/TCO2E to excelexporters of equipmentenergycategory, combinedequipmentenergycategory and storeenergycategory.
-   added Pie charts of TCE and TCO2E to excel exporter of shopfloorenergycategory report.
-   added validation for area of shopfloor, space, store and tenant in API.

### Changed
-   reformatted excel exporters of shopfloor reports.
-   reformatted excel exporters of store reports.
-   reformatted excel exporters of tenant reports
-   reformatted excel exporters of equipment reports
-   renamed parameter worksheet names in excel exporters.
-   updated database demo data in German.
-   updated Database Demo in English.

### Fixed
-   fixed PEP8 warnings.
-   fixed warnings in Excel exporters.

### Removed
-   Remove Child Space Data Section from EquipmentEnergyCategory Excel Exporter.
-   deleted unused comments from excelexporters.


## [v1.3.1] -   2021-10-15
### Added
-   added maximum load to tenantbatch report

### Changed
-   updated config.py files to move all variables to .env files via Python Decouple
-   modified the doc for docker-compose
-   updated database installation script and README
-   reformatted excel exporters
-   changed name font from Constantia to Arial in Excel exporters.

### Fixed
-   fixed error when opening CombinedEquipmentEfficiency Excel report
-   fixed issue for editing user name and password in Admin UI
-   fixed NoneType issues in ExcelExporters.

### Removed
-   None.

## [v1.3.0] -   2021-09-04
### Added
-   added expiration datetimes to User in Admin UI
-   added expiration datetimes to user actions in API
-   added expiration datetimes to user table in database
-   added column ID to StoreBatch Excel Exporter in API
-   added meter ID to meterbatch excel exporter in API
-   added new datasource protocols to API
-   added API error messages to translations.js and i18n.js
-   added spinners to Dashboard of Web UI.

### Changed
-   replaced Chinese with English in Excel Exporters of API
-   changed start&end datetime formatter for tariff from timestamp to strftime
-   changed lease start&end datetime formatter for tenant from timestamp to strftime
-   changed last run datetime and next run datetime formatter for rule from timestamp to strftime
-   changed last seen datetime formatter for gateway from timestamp to strftime
-   changed last seen datetime formatter of datasource from timestamp to strftime
-   changed upload datetime formatter of knowledgefile and offlinemeterfile from timestamp to strftime
-   changed cost file upload datetime formatter from timestamp to strftime
-   updated translation of Admin UI
-   updated database README
-   updated demo databse for database ingestion service
-   updated distibutionssystem point value timeout value to 30 minutes
-   updated Admin UI to make error messages more specific
-   updated translations of KGCE & KGCO2E in Admin UI
-   updated userlogger in API to pass HTTPError to client.

### Fixed
-   fixed PEP8 warnings in API
-   fixed typo in contact controller of Admin UI
-   added try_files directive to avoid 404 error while refreshing pages in Web UI
-   modified API error message for knowledge file cannot be removed from disk.

### Removed
-   removed cookies usages from API

## [v1.2.3] -   2021-09-04
### Added
-   added tbl_reports to myems_reporting_db in database.
-   added trusted-host to Dockerfiles

### Changed
-   updated README.
-   renamed language cn to zh-cn in Admin UI

### Fixed
-   fixed Local Storage conflicts in Admin UI and Web UI .
-   fixed issues in database demo script

### Removed
-   None.

## [v1.2.2] -   2021-08-28
### Added
-   added user log to UserLogin, ChangePassword and ResetPassword in API
-   implemented user_logger decorators in API
-   added default passwords to README.

### Changed
-   updated myems_user_db.tbl_logs in database
-   updated i18n of WebUI
-   changed user token hash algorithm from sha1 to sha256 in API
-   upgraded dropzone js library in Admin UI
-   moved css files for dropzone from js folder to css folder in Admin UI

### Fixed
-   fixed code style warnings in README
-   fixed PEP8 warnings in API
-   fixed code style warnings in API
-   fixed translation errors in Admin UI
-   fixed issues of markdown in README files
-   fixed typeof issue of dropzone js in Admin UI
-   fixed issue of 'typeof' expression compared to 'null' in Web UI
-   fixed toaster issues for uploading file in Admin UI

### Removed
-   removed unnecessary dropzone-amd-module library from Admin UI

## [v1.2.1] -   2021-08-19
### Added
-   Added Missing Error Messages Words of API to Web UI i18n
-   Added rule_id to messages tables of fdd database
-   added version tags to images in Dockerfile

### Changed
-   renamed virtualmeter.model.html in Admin UI
-   replaced stateChangeStart with transitions.onStart in Admin UI
-   added filters for jstree action types of menu and space in Admin UI
-   updated README of Web UI
-   replaced href with ng-href in Admin UI
-   upgraded Highcharts JS to v9.1.2
-   upgraded jquery-ui to v1.12.1
-   updated Admin UI translations for Error Messages of API
-   upgraded ocLazyLoad to v1.0.10 in Admin UI
-   updated Dockerfiles to add pip mirrors
-   upgraded AngularJS to v1.8.2

### Fixed
-   removed unnecessary jc.jsextend library from Admin UI
-   fixed debugging code issues in Admin UI
-   fixed unused code issues in Admin UI
-   fixed self assignment error in Web UI
-   fixed 'Clear-text logging of sensitive information' in API
-   fixed 'The variable binary_file_data does not seem to be defined for all execution paths' in API
-   replaced == with === to avoid casting in Admin UI
-   fixed response body of Restore actions
-   fixed typos in database
-   fixed typo in API
-   fixed typo in demo data of database

### Removed
-   removed unused logs
-   removed diff-match-patch library from Admin UI
-   removed jeditable library from Admin UI
-   removed js plugins codemirror and summernote from Admin UI
-   removed 'unused import' from API
-   removed uncessary pass from acquisition.py of myems-modbus-tcp
-   removed unused import from meterbatch.py of API
-   removed unnecessary library mathjax from Admin UI
-   removed unnecessary libraries d3, and3, nvd3 and c3 from Admin UI
-   removed unnecessary library nggrid from Admin UI

## [v1.2.0] -   2021-08-08
### Added
-   Added demo data to database 

### Changed
-   Replaced every_day_* to periodic_* in excelexporters of API
-   Updated Dockerfiles

### Fixed
-   Replaced every_day_* to periodic_* in excelexporters of API
-   Fixed data issues of tbl_menus in database

### Removed
-   Deleted unnecessary words in translations of Admin UI

## [v1.1.6] -   2021-08-02
### Added
-   Added Meter Batch Analysis Report
-   Added Child Space Share Pies for SpaceCost in Web UI
-   Added Web UI & Admin UI Installation Guide on Apache Web Server
-   Added Dockerfiles
-   Added Customized Menus in Web UI, API and Admin UI

### Changed
-   None.

### Fixed
-   Upgraded jquery to v2.2.4 in Admin UI

### Removed
-   None.

## [v1.1.5] -   2021-07-20
### Added
-   None.

### Changed
-   changed all worksheet names of Excel exporters in API

### Fixed
-   updated upgrade1.1.4 sql
-   fixed issue of gitignore in Admin UI

### Removed
-   None.

## [v1.1.4] -   2021-07-19
### Added
-   added tbl_email_messages to myems_reporting_db
-   added data sort to FDD messages in Admin UI
-   added new category to FDD rule in API & Admin UI
-   added Search Input for meters in Web UI
-   added last year data to dashboard
-   added ChildSpaceProportion SharePies to Space Energy Category report of Web UI
-   added ORDER BY utc_date_time to all digital parameters data in API
-   added the pagination for meter realtime page
-   added pagination to MeterRealtime in Web UI
-   added internationalization of Vertical Navigation Bar in Web UI
-   added Equipment Batch Analysis report API
-   added Cost File to API and Admin UI
-   added restore button to offline meter file in API and Admin UI

### Changed
-   changed GET Data Source Point Collection to order by ID
-   changed equipment and combined equipment associated points name to parameters name in reports API
-   updated validate expression of rule in API
-   updated i18n in Web UI
-   upgraded Web UI library to 2.10.2

### Fixed
-   fixed typo for deleting email messages in Admin UI
-   fixed issues of deleting text message and wechat message in Admin UI
-   fixed base period cost units issue of Dashboard API
-   fixed selected meter issues in onSearchMeter of Web UI
-   fixed wrong HTTP Status Code issues in API
-   fixed Child Space Share Pie issue in excel exporter of spaceenergycategory

### Removed
-   Drop table tbl_sms_recipients from myems_fdd_db
-   deleted parameters data from Dashboard

## [v1.1.3] -   2021-05-25
### Added
-   added Combined Equipment Batch Analysis Report
-   added Shopfloor Batch Analysis Report
-   added Store Batch Analysis Report
-   added Tenant Batch Analysis Report
-   implemented virtual point calculating in myems-normalization service
-   added is_virtual to tbl_points in database
-   added gateway process to myems-modbus-tcp service
-   added gateway process to myems-bacnet service
-   added procedure to update last seen datetime of data source in myems-modbus service
-   added last seen datetime to data source setting in Admin UI
-   added last seen datetime to Gateway Setting in Admin UI
-   added excel exporter of spaceefficiency report in API

### Changed
-   updated Dashboard in web to display energy data of this year
-   updated tbl_expressions in database
-   added start value and end value to metertracking report
-   updated comments and log messages in myems-modbust-tcp service
-   improved theme of energyflowdiagram in Web UI

### Fixed
-   updated metertracking report to reduce duplicated meters
-   fixed detailed value missing issue in SpaceEfficiency report in Web UI

### Removed
-   None.

## [v1.1.2] -   2021-04-23
### Added
-   added associated parameters data to excel exporter of shopfloorstatistics in API
-   added associated parameters data to excel exporter of shopfloorsaving in API
-   added associated parameters data to excel exporter of shopfloorload in API
-   added associated parameters data to excel exporter of shopfloorenergyitem in API
-   added associated parameters data to excel exporter of shopfloorenergycategory in API
-   added associated parameters data to excel exporter of shopfloorcost in API
-   added associated parameters data to excel exporter of storestatistics in API
-   added associated parameters data to excel exporter of storesaving in API
-   added associated parameters data to excel exporter of storeload in API 
-   added associated parameters data to storeenergyitem in API 
-   added associated parameters data to excel exporter of storeenergycategory in API
-   added associated parameters data to excel exporter of storecost in API
-   added associated parameters data to excel exporter of spacestatistics in API
-   added associated parameters data to excel exporter of spacesaving in API
-   added associated parameters data to excel exporter of spaceoutput in API
-   added associated parameters data to excel exporter of spaceload in API
-   added associated parameters data to excel exporter of spaceincome in API
-   added associated parameters data to excel exporter of spaceenergyitem in API
-   added associated parameters data to excel exporter of spaceenergycategory in API
-   added associated parameters data to excel export of spacecost in API
-   added associated parameters data to excel exporter of metertrend in API
-   added associated parameters data to excel exporter of meterenergy in API
-   added associated parameters data to excel exporter of metersubmetersbalance in API
-   added parameters data to excel exporter of metercost in API
-   added associated parameters data to excel exporter of tenantstatistics in API
-   added associated parameters data to excel exporter of tenantsaving in API
-   added associated parameters data to excel exporter of tenantload in API
-   added associated parameters data to excel exporter of tenantenergyitem in API
-   added associated parameters data to excel exporter of tenantenergycategory in API
-   added associated parameters data to excel exporter of tenantcost in API
-   added associated parameters data to excel exporter of combinedequipmentstatistics in API
-   added associated parameters data to combinedequipmentsaving in API
-   added associated parameters data to combinedequipmentload in API
-   added associated parameters data to combinedequipmentoutput in API
-   added associated parameters data to combinedequipmentincome in API
-   added associated parameters data to combinedequipmentenergyitem in API
-   added associated parameters data to combinedequipmentenergycategory in API
-   added associated parameters data to combinedequipmentcost in API
-   added quickmode to HTTP request parameters of MeterTrend report in API
-   added parameter data to excel exporter of EquipmentStatistics in API
-   added parameter data to excel exporter of EquipmentSaving in API
-   added parameter data to excel exporter of EquipmentOutput in API
-   added parameter data to excel exporter of EquipmentLoad in API
-   added parameters data to excel exporter of EquipmentEnergyItem in API
-   added parameters data to excel exporter of EquipmentEnergyCategory in API

### Changed
-   updated README
-   updated excel exporter of metersubmetersbalance in API
-   updated excel exporter of meterenergy in API
-   updated excel exporter of metercost in API
-   updated panel width and height of costcenter in Admin UI
-   updated panel width and height of combinedequipment view in Admin UI
-   updated panel width and height of equipment view in Admin UI
-   changed query form column width from auto to xs={6} sm={3} in Web UI

### Fixed
-   fixed issues in excel exporters of combinedequipment in API
-   added parameters validator to statistics_hourly_data_by_period in API
-   added code to validate parameters of averaging_hourly_data_by_period in API
-   fixed issue in excel exporter of equipmentincome in API
-   fixed unit issue in CombinedEquipmentCost report in API


### Removed
-   deleted slim-scroll from and added maxheight to panel of views in Admin UI


## [v1.1.1] -   2021-03-31
### Added
-   added associated equipment data to CombinedEquipmentCost report in API
-   added associated equipment data to CombinedEquipmentStatistics report in API
-   added associated equipment data to CombinedEquipmentSaving report in API
-   added associated equipment data to CombinedEquipmentOutput report in API
-   added associated equipment data to CombinedEquipmentLoad report in API
-   added associated equipment data to CombinedEquipmentIncome report in API
-   added associated equipment data to CombinedEquipmentEnergyItem report in API
-   added associated equipment data to CombinedEquipmentEnergyCategory report in API
-   added quickmode parameter to combinedequipmentefficiency report in API
-   added associated equipment data to CombinedEquipmentStatistics in Web UI
-   added associated equipment data to CombinedEquipmentLoad in Web UI
-   added excel exporter of equipmentcost reporter in API
-   added associated equipment data to CombinedEquipmentEnergyItem report in API
-   added AssociatedEquipmentTable to CombinedEquipmentIncome Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentSaving Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentOutput Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentIncome Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentCost Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentEnergyCategory Report in web UI
-   added AssociatedEquipmentTable to CombinedEquipmentEnergyItem Report in web UI
-   added last_run_datetime and next_run_datetime to rule in API
-   added Deutsch (German) login language list in admin UI

### Changed
-   reduced font size of meterrealtime in Web UI
-   moved category before fdd_code of rule in admin UI and API

### Fixed
-   fixed omission mistakes in myems-cleaning
-   fixed error for large number of parameters in combinedequipmentefficiency and equipmentefficiency in API
-   fixed error of None Comparison in API
-   fixed NoneType error in all Load reports API.

### Removed
-   None.


## [v1.1.0] -   2021-03-18
### Added
-   added excel exporter of equipmentefficiency report.
-   added excel exporter of conbinedequipmentefficiency report in API.
-   added 'optional' tips to meter,virtual meter and offline meter setting in admin UI.
-   added Optional key to translation in admin UI.
-   added cominbedequipmentefficiency report to api and web.
-   added equipmentefficiency report api.

### Changed
-   updated cost file controller in admin UI
-   updated user login session expire time to 8 hours.
-   changed web UI and API to set contact of space is optional.

### Fixed
-   fixed http headers issues of offlinemeterfile, knowledgefile and costfile in admin UI
-   changed float datatype to Decimal datatype for offline meter normalization.
-   fixed issue of add space in web UI.
-   added historical database close and disconnect at the end of reports.

### Removed
-   None.

## [v1.0.8] -   2021-03-11
### Added
-   added excel exporter of combinedequipmentstatistics report
-   added translation for German
-   added excel exporter of storesaving report
-   added excel exporter of equipmentincome report
-   added excel exporter of shopfloorsaving report
-   added excel exporter of equipmentload report

### Changed
-   Changed default reporting range in EnergyFlowDiagram.

### Fixed
-   None.

### Removed
-   None.

## [v1.0.7] -   2021-03-07
### Added
-   added excel exporter of storeload report
-   added excel exporter of spaceincome report
-   added excel exporter of equipmentsaving report
-   added excel exporter of combinedequipmentsaving report
-   added excel exporter of combinedequipmentload report
-   added excel exporter of spaceoutput report
-   added excel exporter of combinedequipmentoutput
-   added excel exporter of combinedequipmentcost report
-   added excel exporter of shopfloorcost report
-   added excel exporter of shopfloorload report
-   added excel exporter of combinedequipmentenergycategory report
-   added excel exporter of combinedequipmentitem report.
-   added excel exporter of equipmentenergyitem report.
-   added excel exporter of equipmentenergycategory report.
-   added excel exporter of shopfloorenergyitem report.

### Changed
-   None.

### Fixed
-   fixed wrong HTTP headers in admin.
-   fixed typo in combinedequipment controller in admin.
-   fixed energy item undefined issue when edit virtual meter and offline meter.

### Removed
-   removed 'required' property from equipment model in admin.

## [v1.0.6] -   2021-02-26
### Added
-   added store statistics report excel exporter.
-   added equipment tracking excel exporter.
-   added store cost report excel exporter.
-   added equipment statistics report excel exporter.
-   added store energy item report excel exporter.
-   added shopfloor statistics report excel exporter.
-   merged myems-api.

### Changed
-   modified database table tbl_energy_flow_diagrams_links

### Fixed
-   fixed energy category names and units issue in EnergyItem reports.

### Removed
-   None.

## [v1.0.5] -   2021-02-23
### Added
-   None.

### Changed
-   None.

### Fixed
-   None.

### Removed
-   None.

[Unreleased]: https://github.com/MyEMS/myems/compare/v1.4.0...HEAD
[v1.4.0]: https://github.com/MyEMS/myems/compare/v1.3.4...v1.4.0
[v1.3.4]: https://github.com/MyEMS/myems/compare/v1.3.3...v1.3.4
[v1.3.3]: https://github.com/MyEMS/myems/compare/v1.3.2...v1.3.3
[v1.3.2]: https://github.com/MyEMS/myems/compare/v1.3.1...v1.3.2
[v1.3.1]: https://github.com/MyEMS/myems/compare/v1.3.0...v1.3.1
[v1.3.0]: https://github.com/MyEMS/myems/compare/v1.2.3...v1.3.0
[v1.2.3]: https://github.com/MyEMS/myems/compare/v1.2.2...v1.2.3
[v1.2.2]: https://github.com/MyEMS/myems/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/MyEMS/myems/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/MyEMS/myems/compare/v1.1.6...v1.2.0
[v1.1.6]: https://github.com/MyEMS/myems/compare/v1.1.5...v1.1.6
[v1.1.5]: https://github.com/MyEMS/myems/compare/v1.1.4...v1.1.5
[v1.1.4]: https://github.com/MyEMS/myems/compare/v1.1.3...v1.1.4
[v1.1.3]: https://github.com/MyEMS/myems/compare/v1.1.2...v1.1.3
[v1.1.2]: https://github.com/MyEMS/myems/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/MyEMS/myems/compare/v1.1.0...v1.1.1
[v1.0.8]: https://github.com/MyEMS/myems/compare/v1.0.8...v1.1.0
[v1.0.8]: https://github.com/MyEMS/myems/compare/v1.0.7...v1.0.8
[v1.0.7]: https://github.com/MyEMS/myems/compare/v1.0.6...v1.0.7
[v1.0.6]: https://github.com/MyEMS/myems/compare/v1.0.5...v1.0.6
[v1.0.5]: https://github.com/MyEMS/myems/releases/tag/v1.0.5

