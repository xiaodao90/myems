import React, { Fragment, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Spinner,
} from 'reactstrap';
import CountUp from 'react-countup';
import Datetime from 'react-datetime';
import moment from 'moment';
import loadable from '@loadable/component';
import Cascader from 'rc-cascader';
import CardSummary from '../common/CardSummary';
import LineChart from '../common/LineChart';
import { getCookieValue, createCookie } from '../../../helpers/utils';
import withRedirect from '../../../hoc/withRedirect';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ButtonIcon from '../../common/ButtonIcon';
import { APIBaseURL } from '../../../config';
import { periodTypeOptions } from '../common/PeriodTypeOptions';
import { comparisonTypeOptions } from '../common/ComparisonTypeOptions';


const DetailedDataTable = loadable(() => import('../common/DetailedDataTable'));
const AssociatedEquipmentTable = loadable(() => import('../common/AssociatedEquipmentTable'));

const CombinedEquipmentEfficiency = ({ setRedirect, setRedirectUrl, t }) => {
  let current_moment = moment();
  useEffect(() => {
    let is_logged_in = getCookieValue('is_logged_in');
    let user_name = getCookieValue('user_name');
    let user_display_name = getCookieValue('user_display_name');
    let user_uuid = getCookieValue('user_uuid');
    let token = getCookieValue('token');
    if (is_logged_in === null || !is_logged_in) {
      setRedirectUrl(`/authentication/basic/login`);
      setRedirect(true);
    } else {
      //update expires time of cookies
      createCookie('is_logged_in', true, 1000 * 60 * 60 * 8);
      createCookie('user_name', user_name, 1000 * 60 * 60 * 8);
      createCookie('user_display_name', user_display_name, 1000 * 60 * 60 * 8);
      createCookie('user_uuid', user_uuid, 1000 * 60 * 60 * 8);
      createCookie('token', token, 1000 * 60 * 60 * 8);
    }
  });
  // State
  // Query Parameters
  const [selectedSpaceName, setSelectedSpaceName] = useState(undefined);
  const [selectedSpaceID, setSelectedSpaceID] = useState(undefined);
  const [combinedEquipmentList, setCombinedEquipmentList] = useState([]);
  const [selectedCombinedEquipment, setSelectedCombinedEquipment] = useState(undefined);
  const [comparisonType, setComparisonType] = useState('month-on-month');
  const [periodType, setPeriodType] = useState('daily');
  const [basePeriodBeginsDatetime, setBasePeriodBeginsDatetime] = useState(current_moment.clone().subtract(1, 'months').startOf('month'));
  const [basePeriodEndsDatetime, setBasePeriodEndsDatetime] = useState(current_moment.clone().subtract(1, 'months'));
  const [basePeriodBeginsDatetimeDisabled, setBasePeriodBeginsDatetimeDisabled] = useState(true);
  const [basePeriodEndsDatetimeDisabled, setBasePeriodEndsDatetimeDisabled] = useState(true);
  const [reportingPeriodBeginsDatetime, setReportingPeriodBeginsDatetime] = useState(current_moment.clone().startOf('month'));
  const [reportingPeriodEndsDatetime, setReportingPeriodEndsDatetime] = useState(current_moment);
  const [cascaderOptions, setCascaderOptions] = useState(undefined);

  // buttons
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [spinnerHidden, setSpinnerHidden] = useState(true);
  const [exportButtonHidden, setExportButtonHidden] = useState(true);

  //Results
  const [cardSummaryList, setCardSummaryList] = useState([]);
  const [combinedEquipmentLineChartLabels, setCombinedEquipmentLineChartLabels] = useState([]);
  const [combinedEquipmentLineChartData, setCombinedEquipmentLineChartData] = useState({});
  const [combinedEquipmentLineChartOptions, setCombinedEquipmentLineChartOptions] = useState([]);

  const [parameterLineChartLabels, setParameterLineChartLabels] = useState([]);
  const [parameterLineChartData, setParameterLineChartData] = useState({});
  const [parameterLineChartOptions, setParameterLineChartOptions] = useState([]);

  const [detailedDataTableData, setDetailedDataTableData] = useState([]);
  const [detailedDataTableColumns, setDetailedDataTableColumns] = useState([{dataField: 'startdatetime', text: t('Datetime'), sort: true}]);

  const [associatedEquipmentTableData, setAssociatedEquipmentTableData] = useState([]);
  const [associatedEquipmentTableColumns, setAssociatedEquipmentTableColumns] = useState([{dataField: 'name', text: t('Associated Equipment'), sort: true }]);


  const [excelBytesBase64, setExcelBytesBase64] = useState(undefined);

  useEffect(() => {
    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/tree', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      console.log(response)
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      console.log(json)
      if (isResponseOK) {
        // rename keys 
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        setCascaderOptions(json);
        setSelectedSpaceName([json[0]].map(o => o.label));
        setSelectedSpaceID([json[0]].map(o => o.value));
        // get CombinedEquipments by root Space ID
        let isResponseOK = false;
        fetch(APIBaseURL + '/spaces/' + [json[0]].map(o => o.value) + '/combinedequipments', {
          method: 'GET',
          headers: {
            "Content-type": "application/json",
            "User-UUID": getCookieValue('user_uuid'),
            "Token": getCookieValue('token')
          },
          body: null,

        }).then(response => {
          if (response.ok) {
            isResponseOK = true;
          }
          return response.json();
        }).then(json => {
          if (isResponseOK) {
            json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
            console.log(json);
            setCombinedEquipmentList(json[0]);
            if (json[0].length > 0) {
              setSelectedCombinedEquipment(json[0][0].value);
              // enable submit button
              setSubmitButtonDisabled(false);
            } else {
              setSelectedCombinedEquipment(undefined);
              // disable submit button
              setSubmitButtonDisabled(true);
            }
          } else {
            toast.error(json.description)
          }
        }).catch(err => {
          console.log(err);
        });
        // end of get CombinedEquipments by root Space ID
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });

  }, []);
  
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';

  let onSpaceCascaderChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setSelectedSpaceName(selectedOptions.map(o => o.label).join('/'));
    setSelectedSpaceID(value[value.length - 1]);

    let isResponseOK = false;
    fetch(APIBaseURL + '/spaces/' + value[value.length - 1] + '/combinedequipments', {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      if (isResponseOK) {
        json = JSON.parse(JSON.stringify([json]).split('"id":').join('"value":').split('"name":').join('"label":'));
        console.log(json)
        setCombinedEquipmentList(json[0]);
        if (json[0].length > 0) {
          setSelectedCombinedEquipment(json[0][0].value);
          // enable submit button
          setSubmitButtonDisabled(false);
        } else {
          setSelectedCombinedEquipment(undefined);
          // disable submit button
          setSubmitButtonDisabled(true);
        }

        // hide export buttion
        setExportButtonHidden(true)
      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });
  }

  let onComparisonTypeChange = ({ target }) => {
    console.log(target.value);
    setComparisonType(target.value);
    if (target.value === 'year-over-year') {
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
      setBasePeriodBeginsDatetime(moment(reportingPeriodBeginsDatetime).subtract(1, 'years'));
      setBasePeriodEndsDatetime(moment(reportingPeriodEndsDatetime).subtract(1, 'years'));
    } else if (target.value === 'month-on-month') {
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
      setBasePeriodBeginsDatetime(moment(reportingPeriodBeginsDatetime).subtract(1, 'months'));
      setBasePeriodEndsDatetime(moment(reportingPeriodEndsDatetime).subtract(1, 'months'));
    } else if (target.value === 'free-comparison') {
      setBasePeriodBeginsDatetimeDisabled(false);
      setBasePeriodEndsDatetimeDisabled(false);
    } else if (target.value === 'none-comparison') {
      setBasePeriodBeginsDatetime(undefined);
      setBasePeriodEndsDatetime(undefined);
      setBasePeriodBeginsDatetimeDisabled(true);
      setBasePeriodEndsDatetimeDisabled(true);
    }
  }

  let onBasePeriodBeginsDatetimeChange = (newDateTime) => {
    setBasePeriodBeginsDatetime(newDateTime);
  }

  let onBasePeriodEndsDatetimeChange = (newDateTime) => {
    setBasePeriodEndsDatetime(newDateTime);
  }

  let onReportingPeriodBeginsDatetimeChange = (newDateTime) => {
    setReportingPeriodBeginsDatetime(newDateTime);
    if (comparisonType === 'year-over-year') {
      setBasePeriodBeginsDatetime(newDateTime.clone().subtract(1, 'years'));
    } else if (comparisonType === 'month-on-month') {
      setBasePeriodBeginsDatetime(newDateTime.clone().subtract(1, 'months'));
    }
  }

  let onReportingPeriodEndsDatetimeChange = (newDateTime) => {
    setReportingPeriodEndsDatetime(newDateTime);
    if (comparisonType === 'year-over-year') {
      setBasePeriodEndsDatetime(newDateTime.clone().subtract(1, 'years'));
    } else if (comparisonType === 'month-on-month') {
      setBasePeriodEndsDatetime(newDateTime.clone().subtract(1, 'months'));
    }
  }

  var getValidBasePeriodBeginsDatetimes = function (currentDate) {
    return currentDate.isBefore(moment(basePeriodEndsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidBasePeriodEndsDatetimes = function (currentDate) {
    return currentDate.isAfter(moment(basePeriodBeginsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidReportingPeriodBeginsDatetimes = function (currentDate) {
    return currentDate.isBefore(moment(reportingPeriodEndsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  var getValidReportingPeriodEndsDatetimes = function (currentDate) {
    return currentDate.isAfter(moment(reportingPeriodBeginsDatetime, 'MM/DD/YYYY, hh:mm:ss a'));
  }

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(selectedSpaceID);
    console.log(selectedCombinedEquipment);
    console.log(comparisonType);
    console.log(periodType);
    console.log(basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : undefined);
    console.log(reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    console.log(reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'));
    
    // disable submit button
    setSubmitButtonDisabled(true);
    // show spinner
    setSpinnerHidden(false);
    // hide export buttion
    setExportButtonHidden(true)

    // Reinitialize tables
    setDetailedDataTableData([]);
    setAssociatedEquipmentTableData([]);

    
    let isResponseOK = false;
    fetch(APIBaseURL + '/reports/combinedequipmentefficiency?' +
      'combinedequipmentid=' + selectedCombinedEquipment +
      '&periodtype=' + periodType +
      '&baseperiodstartdatetime=' + (basePeriodBeginsDatetime != null ? basePeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&baseperiodenddatetime=' + (basePeriodEndsDatetime != null ? basePeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss') : '') +
      '&reportingperiodstartdatetime=' + reportingPeriodBeginsDatetime.format('YYYY-MM-DDTHH:mm:ss') +
      '&reportingperiodenddatetime=' + reportingPeriodEndsDatetime.format('YYYY-MM-DDTHH:mm:ss'), {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "User-UUID": getCookieValue('user_uuid'),
        "Token": getCookieValue('token')
      },
      body: null,

    }).then(response => {
      if (response.ok) {
        isResponseOK = true;
      }
      return response.json();
    }).then(json => {
      if (isResponseOK) {
        console.log(json)
        
        let cardSummaryArray = []
        json['reporting_period_efficiency']['names'].forEach((currentValue, index) => {
          let cardSummaryItem = {}
          cardSummaryItem['name'] = json['reporting_period_efficiency']['names'][index];
          cardSummaryItem['unit'] = json['reporting_period_efficiency']['units'][index];
          cardSummaryItem['cumulation'] = json['reporting_period_efficiency']['cumulations'][index];
          cardSummaryItem['increment_rate'] = parseFloat(json['reporting_period_efficiency']['increment_rates'][index] * 100).toFixed(2) + "%";
          cardSummaryArray.push(cardSummaryItem);
        });
        setCardSummaryList(cardSummaryArray);
      
        let timestamps = {}
        json['reporting_period_efficiency']['timestamps'].forEach((currentValue, index) => {
          timestamps['a' + index] = currentValue;
        });
        setCombinedEquipmentLineChartLabels(timestamps);
        
        let values = {}
        json['reporting_period_efficiency']['values'].forEach((currentValue, index) => {
          values['a' + index] = currentValue;
        });
        setCombinedEquipmentLineChartData(values);
        
        let names = Array();
        json['reporting_period_efficiency']['names'].forEach((currentValue, index) => {
          let unit = json['reporting_period_efficiency']['units'][index];
          names.push({ 'value': 'a' + index, 'label': currentValue + ' (' + unit + ')'});
        });
        setCombinedEquipmentLineChartOptions(names);
       
        timestamps = {}
        json['parameters']['timestamps'].forEach((currentValue, index) => {
          timestamps['a' + index] = currentValue;
        });
        setParameterLineChartLabels(timestamps);

        values = {}
        json['parameters']['values'].forEach((currentValue, index) => {
          values['a' + index] = currentValue;
        });
        setParameterLineChartData(values);
      
        names = Array();
        json['parameters']['names'].forEach((currentValue, index) => {
          if (currentValue.startsWith('TARIFF-')) {
            currentValue = t('Tariff') + currentValue.replace('TARIFF-', '-');
          }
          
          names.push({ 'value': 'a' + index, 'label': currentValue });
        });
        setParameterLineChartOptions(names);
      
        let detailed_value_list = [];
        if (json['reporting_period_efficiency']['timestamps'].length > 0) {
          json['reporting_period_efficiency']['timestamps'][0].forEach((currentTimestamp, timestampIndex) => {
            let detailed_value = {};
            detailed_value['id'] = timestampIndex;
            detailed_value['startdatetime'] = currentTimestamp;
            json['reporting_period_efficiency']['values'].forEach((currentValue, parameterIndex) => {
              if (json['reporting_period_efficiency']['values'][parameterIndex][timestampIndex] != null) {
                detailed_value['a' + parameterIndex] = json['reporting_period_efficiency']['values'][parameterIndex][timestampIndex];
              } else {
                detailed_value['a' + parameterIndex] = null;
              };
            });
            
            detailed_value_list.push(detailed_value);
          });
        };

        let detailed_value = {};
        detailed_value['id'] = detailed_value_list.length;
        detailed_value['startdatetime'] = t('Subtotal');
        json['reporting_period_efficiency']['cumulations'].forEach((currentValue, index) => {
            detailed_value['a' + index] = currentValue;
          });
        detailed_value_list.push(detailed_value);
        setDetailedDataTableData(detailed_value_list);
        
        let detailed_column_list = [];
        detailed_column_list.push({
          dataField: 'startdatetime',
          text: t('Datetime'),
          sort: true
        })
        json['reporting_period_efficiency']['names'].forEach((currentValue, index) => {
          let unit = json['reporting_period_efficiency']['units'][index];
          detailed_column_list.push({
            dataField: 'a' + index,
            text: currentValue + ' (' + unit + ')',
            sort: true,
            formatter: function (decimalValue) {
              if (decimalValue !== null) {
                return decimalValue.toFixed(2);
              } else {
                return null;
              }
            }
          })
        });
        setDetailedDataTableColumns(detailed_column_list);

        let associated_equipment_value_list = [];
        if (json['associated_equipment']['associated_equipment_names_array'].length > 0) {
          json['associated_equipment']['associated_equipment_names_array'][0].forEach((currentEquipmentName, equipmentIndex) => {
            let associated_equipment_value = {};
            associated_equipment_value['id'] = equipmentIndex;
            associated_equipment_value['name'] = currentEquipmentName;
            json['associated_equipment']['energy_category_names'].forEach((currentValue, energyCategoryIndex) => {
              associated_equipment_value['a' + energyCategoryIndex] = json['associated_equipment']['subtotals_array'][energyCategoryIndex][equipmentIndex].toFixed(2);
            });
            associated_equipment_value_list.push(associated_equipment_value);
          });
        };

        setAssociatedEquipmentTableData(associated_equipment_value_list);

        let associated_equipment_column_list = [];
        associated_equipment_column_list.push({
          dataField: 'name',
          text: t('Associated Equipment'),
          sort: true
        });
        json['associated_equipment']['energy_category_names'].forEach((currentValue, index) => {
          let unit = json['associated_equipment']['units'][index];
          associated_equipment_column_list.push({
            dataField: 'a' + index,
            text: currentValue + ' (' + unit + ')',
            sort: true
          });
        });

        setAssociatedEquipmentTableColumns(associated_equipment_column_list);

        setExcelBytesBase64(json['excel_bytes_base64']);
      
        // enable submit button
        setSubmitButtonDisabled(false);
        // hide spinner
        setSpinnerHidden(true);
        // show export buttion
        setExportButtonHidden(false);

      } else {
        toast.error(json.description)
      }
    }).catch(err => {
      console.log(err);
    });      
  };
  
  const handleExport = e => {
    e.preventDefault();
    const mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const fileName = 'combinedequipmentefficiency.xlsx'
    var fileUrl = "data:" + mimeType + ";base64," + excelBytesBase64;
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            var link = window.document.createElement("a");
            link.href = window.URL.createObjectURL(blob, { type: mimeType });
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
  };
  

  return (
    <Fragment>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>{t('Combined Equipment Data')}</BreadcrumbItem><BreadcrumbItem active>{t('Efficiency')}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card className="bg-light mb-3">
        <CardBody className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="space">
                    {t('Space')}
                  </Label>
                  <br />
                  <Cascader options={cascaderOptions}
                    onChange={onSpaceCascaderChange}
                    changeOnSelect
                    expandTrigger="hover">
                    <Input value={selectedSpaceName || ''} readOnly />
                  </Cascader>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="combinedEquipmentSelect">
                    {t('Combined Equipment')}
                  </Label>
                  <CustomInput type="select" id="combinedEquipmentSelect" name="combinedEquipmentSelect" onChange={({ target }) => setSelectedCombinedEquipment(target.value)}
                  >
                    {combinedEquipmentList.map((combinedEquipment, index) => (
                      <option value={combinedEquipment.value} key={combinedEquipment.value}>
                        {combinedEquipment.label}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="comparisonType">
                    {t('Comparison Types')}
                  </Label>
                  <CustomInput type="select" id="comparisonType" name="comparisonType"
                    defaultValue="month-on-month"
                    onChange={onComparisonTypeChange}
                  >
                    {comparisonTypeOptions.map((comparisonType, index) => (
                      <option value={comparisonType.value} key={comparisonType.value} >
                        {t(comparisonType.label)}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label className={labelClasses} for="periodType">
                    {t('Period Types')}
                  </Label>
                  <CustomInput type="select" id="periodType" name="periodType" defaultValue="daily" onChange={({ target }) => setPeriodType(target.value)}
                  >
                    {periodTypeOptions.map((periodType, index) => (
                      <option value={periodType.value} key={periodType.value} >
                        {t(periodType.label)}
                      </option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="basePeriodBeginsDatetime">
                    {t('Base Period Begins')}{t('(Optional)')}
                  </Label>
                  <Datetime id='basePeriodBeginsDatetime'
                    value={basePeriodBeginsDatetime}
                    inputProps={{ disabled: basePeriodBeginsDatetimeDisabled }}
                    onChange={onBasePeriodBeginsDatetimeChange}
                    isValidDate={getValidBasePeriodBeginsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="basePeriodEndsDatetime">
                    {t('Base Period Ends')}{t('(Optional)')}
                  </Label>
                  <Datetime id='basePeriodEndsDatetime'
                    value={basePeriodEndsDatetime}
                    inputProps={{ disabled: basePeriodEndsDatetimeDisabled }}
                    onChange={onBasePeriodEndsDatetimeChange}
                    isValidDate={getValidBasePeriodEndsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodBeginsDatetime">
                    {t('Reporting Period Begins')}
                  </Label>
                  <Datetime id='reportingPeriodBeginsDatetime'
                    value={reportingPeriodBeginsDatetime}
                    onChange={onReportingPeriodBeginsDatetimeChange}
                    isValidDate={getValidReportingPeriodBeginsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="reportingPeriodEndsDatetime">
                    {t('Reporting Period Ends')}
                  </Label>
                  <Datetime id='reportingPeriodEndsDatetime'
                    value={reportingPeriodEndsDatetime}
                    onChange={onReportingPeriodEndsDatetimeChange}
                    isValidDate={getValidReportingPeriodEndsDatetimes}
                    closeOnSelect={true} />
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <ButtonGroup id="submit">
                    <Button color="success" disabled={submitButtonDisabled} >{t('Submit')}</Button>
                  </ButtonGroup>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <br></br>
                  <Spinner color="primary" hidden={spinnerHidden}  />
                </FormGroup>
              </Col>
              <Col xs="auto">
                  <br></br>
                  <ButtonIcon icon="external-link-alt" transform="shrink-3 down-2" color="falcon-default" 
                  hidden={exportButtonHidden}
                  onClick={handleExport} >
                    {t('Export')}
                  </ButtonIcon>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <div className="card-deck">
        {cardSummaryList.map(cardSummaryItem => (
          <CardSummary key={cardSummaryItem['name']}
            rate={cardSummaryItem['increment_rate']}
            title={t('Reporting Period Cumulative Efficiency NAME UNIT', { 'NAME': cardSummaryItem['name'], 'UNIT': '(' + cardSummaryItem['unit'] + ')' })}
            color="success" 
            >
            {cardSummaryItem['cumulation'] && <CountUp end={cardSummaryItem['cumulation']} duration={2} prefix="" separator="," decimal="." decimals={2} />}
          </CardSummary>
        ))}
      </div>
      <LineChart reportingTitle={t('Reporting Period Cumulative Efficiency VALUE UNIT', { 'VALUE': null, 'UNIT': null })}
        baseTitle=''
        labels={combinedEquipmentLineChartLabels}
        data={combinedEquipmentLineChartData}
        options={combinedEquipmentLineChartOptions}>
      </LineChart>
      <LineChart reportingTitle={t('Related Parameters')}
        baseTitle=''
        labels={parameterLineChartLabels}
        data={parameterLineChartData}
        options={parameterLineChartOptions}>
      </LineChart>
      <br />
      <DetailedDataTable data={detailedDataTableData} title={t('Detailed Data')} columns={detailedDataTableColumns} pagesize={50} >
      </DetailedDataTable>
      <br />
      <AssociatedEquipmentTable data={associatedEquipmentTableData} title={t('Associated Equipment Data')} columns={associatedEquipmentTableColumns}>
      </AssociatedEquipmentTable>

    </Fragment>
  );
};

export default withTranslation()(withRedirect(CombinedEquipmentEfficiency));
