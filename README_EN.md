# MyEMS

 [中文](./README.md) | [EN](./README_EN.md) | [DE](./README_DE.md)

 [![Documentation Status](https://readthedocs.org/projects/myems/badge/?version=latest)](https://myems.readthedocs.io/en/latest/?badge=latest)
 [![Maintainability](https://api.codeclimate.com/v1/badges/e01a2ca1e833d66040d0/maintainability)](https://codeclimate.com/github/MyEMS/myems/maintainability)
 [![Test Coverage](https://api.codeclimate.com/v1/badges/e01a2ca1e833d66040d0/test_coverage)](https://codeclimate.com/github/MyEMS/myems/test_coverage)
 [![Total alerts](https://img.shields.io/lgtm/alerts/g/MyEMS/myems.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/MyEMS/myems/alerts/)
 [![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/MyEMS/myems.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/MyEMS/myems/context:python)
 [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/MyEMS/myems.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/MyEMS/myems/context:javascript) 
 [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/MyEMS/myems/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/MyEMS/myems/?branch=master)
 [![Build Status](https://scrutinizer-ci.com/g/MyEMS/myems/badges/build.png?b=master)](https://scrutinizer-ci.com/g/MyEMS/myems/build-status/master)
 [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b2cd6049727240e2aaeb8fc7b4086166)](https://www.codacy.com/gh/MyEMS/myems/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MyEMS/myems&amp;utm_campaign=Badge_Grade)

## MyEMS Introduction

MyEMS is an industry-leading open source Energy Management System.
MyEMS can be used for device management, data collection, processing, analysis, visualization and reporting for your EMS projects. 
MyEMS is being developed and maintained by an experienced development team, and the system's source code is published under MIT license.

## MyEMS Architecture

![MyEMS Architecture Function View](/docs/images/architecture-function-view.png)

![MyEMS Architecture Site View](/docs/images/architecture-site-view.png)

## MyEMS Mirrors

[1]. [Github](https://github.com/myems/myems) https://github.com/myems/myems

[2]. [Gitee](https://gitee.com/myems/myems) https://gitee.com/myems/myems

[3]. [Bitbucket](https://bitbucket.org/myems/myems) https://bitbucket.org/myems/myems

[4]. [Gitlab](https://gitlab.com/myems/myems) https://gitlab.com/myems/myems

[5]. [CODE CHINA](https://codechina.csdn.net/myems/myems) https://codechina.csdn.net/myems/myems

## MyEMS Components (Community Edition)

This project is compose of  following components:

### MyEMS Database (SQL)

See [database Introduction & Installation](./database/README.md)

### MyEMS API (Python)

See [myems-api Introduction & Installation](./myems-api/README.md)

### MyEMS Admin UI (ReactJS)

See [myems-admin Introduction & Installation](./admin/README.md)

### MyEMS Modbus TCP Acquisition Service (Python)

See [myems-modbus-tcp Introduction & Installation](./myems-modbus-tcp/README.md)

### MyEMS Cleaning Service (Python)

See [myems-cleaning Introduction & Installation](./myems-cleaning/README.md)

### MyEMS Normalization Service (Python)

See [myems-normalization Introduction & Installation](./myems-normalization/README.md)

### MyEMS Aggregation Service (Python)

See [myems-aggregation Introduction & Installation](./myems-aggregation/README.md)

### MyEMS Web UI (AngularJS)

See [myems-web Introduction & Installation](./web/README.md)

### Default Ports

MyEMS Web UI: 80

MyEMS API: 8000

MyEMS Admin UI: 8001

### Default Passwords
<details>
  <summary>Admin UI</summary>

```
administrator

!MyEMS1
```
</details>

<details>
  <summary>Web UI</summary>

```
administrator@myems.io

!MyEMS1
```
</details>

### Docker Compose Repaid Deployment

See [Docker Compose Repaid Deployment](docker-compose.md)


## Compare Editions

| Features                         | Community Edition | Enterprise Edition | Explanation    |
| :---                             |      :----:       |  :----:            | :----:         |
| Open Source                      | ✔️              | ❌       |                      |
| Pricing                          | Free            | Pay for Projects |               |
| Change Name and Logo             | ❌️             | ✔️        |                      |
| Modbus TCP                       | ✔️             | ✔️        |                      |
| Data Points Number               | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Meters Number                    | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Spaces Number                    | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Equipments Number                | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Tenants Number                   | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Stores Number                    | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Shopfloors Number                | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Combined Equipments Number       | Unlimited       | Unlimited | The actual number is limited by the upper limit of server resources |
| Docker                           | ✔️             | ✔️        | https://hub.docker.com/u/myems |
| Kubernetes                       | ❌             | ✔️        | https://kubernetes.io/ |
| MySQL                            | ✔️             | ✔️        | http://mysql.com/    |
| MariaDB                          | ✔️             | ✔️        | https://mariadb.org/ |
| SingleStore                      | ❌            | ✔️        | https://www.singlestore.com/ |
| AWS Cloud                        | ✔️             | ✔️        | https://aws.amazon.com/ |
| AZure Cloud                      | ✔️             | ✔️        | https://azure.microsoft.com/ |
| Alibaba Cloud                    | ✔️             | ✔️        | https://aliyun.com/ |
| Private Cloud                    | ✔️             | ✔️        |                      |
| Data Comparison                  | ✔️             | ✔️        | Year-on-Year, Month-on-Month, Free Comparison, None Comparison |
| Excel Exporter                   | ✔️             | ✔️        | Tables, Line Charts, Column Charts, Pie Charts |
| Meter/Energy Data                | ✔️             | ✔️        |                      |
| Meter/Cost Data                  | ✔️             | ✔️        |                      |
| Meter/Trend Data                 | ✔️             | ✔️        |                      |
| Meter/Realtime Data              | ✔️             | ✔️        |                      |
| Meter/Master Meter Submeters Balance | ✔️         | ✔️        |                      |
| Meter/Offline Meter Energy Data  | ✔️             | ✔️        |                      |
| Meter/Offline Meter Cost Data    | ✔️             | ✔️        |                      |
| Meter/Virtual Meter Energy Data  | ✔️             | ✔️        |                      |
| Meter/Virtual Meter Cost Data    | ✔️             | ✔️        |                      |
| Meter/Meter Tracking             | ✔️             | ✔️        |                      |
| Space/Energy Category Data       | ✔️             | ✔️        |                      |
| Space/Energy Item Data           | ✔️             | ✔️        |                      |
| Space/Cost Data                  | ✔️             | ✔️        |                      |
| Space/Output Data                | ✔️             | ✔️        |                      |
| Space/Income Data                | ✔️             | ✔️        |                      |
| Space/Efficiency Data            | ✔️             | ✔️        |                      |
| Space/Load Data                  | ✔️             | ✔️        |                      |
| Space/Statistics                 | ✔️             | ✔️        |                      |
| Space/Saving Data                | ❌            | ✔️        | Requires Energy consumption prediction component |
| Equipment/Energy Category Data   | ✔️             | ✔️        |                      |
| Equipment/Energy Item Data       | ✔️             | ✔️        |                      |
| Equipment/Cost Data              | ✔️             | ✔️        |                      |
| Equipment/Output Data            | ✔️             | ✔️        |                      |
| Equipment/Income Data            | ✔️             | ✔️        |                      |
| Equipment/Efficiency Data        | ✔️             | ✔️        |                      |
| Equipment/Load Data              | ✔️             | ✔️        |                      |
| Equipment/Statistics             | ✔️             | ✔️        |                      |
| Equipment/Saving Data            | ❌            | ✔️        | Requires Energy consumption prediction component |
| Equipment/Batch Analysis         | ✔️             | ✔️        |                      |
| Equipment/Equipment Tracking     | ✔️             | ✔️        |                      |
| Tenant/Energy Category Data      | ✔️             | ✔️        |                      |
| Tenant/Energy Item Data          | ✔️             | ✔️        |                      |
| Tenant/Cost Data                 | ✔️             | ✔️        |                      |
| Tenant/Load Data                 | ✔️             | ✔️        |                      |
| Tenant/Statistics                | ✔️             | ✔️        |                      |
| Tenant/Saving Data               | ❌            | ✔️        | Requires Energy consumption prediction component |
| Tenant/Tenant Bill               | ✔️             | ✔️        |                      |
| Tenant/Batch Analysis            | ✔️             | ✔️        |                      |
| Store/Energy Category Data       | ✔️             | ✔️        |                      |
| Store/Energy Item Data           | ✔️             | ✔️        |                      |
| Store/Cost Data                  | ✔️             | ✔️        |                      |
| Store/Load Data                  | ✔️             | ✔️        |                      |
| Store/Statistics                 | ✔️             | ✔️        |                      |
| Store/Saving Data                | ❌            | ✔️        | Requires Energy consumption prediction component |
| Store/Batch Analysis             | ✔️             | ✔️        |                      |
| Shopfloor/Energy Category Data   | ✔️             | ✔️        |                      |
| Shopfloor/Energy Item Data       | ✔️             | ✔️        |                      |
| Shopfloor/Cost Data              | ✔️             | ✔️        |                      |
| Shopfloor/Load Data              | ✔️             | ✔️        |                      |
| Shopfloor/Statistics             | ✔️             | ✔️        |                      |
| Shopfloor/Saving Data            | ❌            | ✔️        | Requires Energy consumption prediction component |
| Shopfloor/Batch Analysis         | ✔️             | ✔️        |                      |
| Combined Equipment/Energy Category Data | ✔️      | ✔️        |                      |
| Combined Equipment/Energy Item Data     | ✔️      | ✔️        |                      |
| Combined Equipment/Cost Data            | ✔️      | ✔️        |                      |
| Combined Equipment/Output Data          | ✔️      | ✔️        |                      |
| Combined Equipment/Income Data          | ✔️      | ✔️        |                      |
| Combined Equipment/Efficiency Data      | ✔️      | ✔️        |                      |
| Combined Equipment/Load Data            | ✔️      | ✔️        |                      |
| Combined Equipment/Statistics           | ✔️      | ✔️        |                      |
| Combined Equipment/Saving Data          | ❌     | ✔️        | Requires Energy consumption prediction component |
| Combined Equipment/Batch Analysis       | ✔️      | ✔️        |                      |
| Energy Dashboard                 | ✔️             | ✔️        |                      |
| Energy Flow Diagram              | ✔️             | ✔️        |                      |
| Distribution System              | ✔️             | ✔️        |                      |
| REST API                         | ✔️             | ✔️        |                      |
| Web UI                           | ✔️             | ✔️        |                      |
| Admin UI                         | ✔️             | ✔️        |                      |
| BACnet/IP                        | ❌             | ✔️        | http://www.bacnet.org/ |
| MQTT Subscriber                  | ❌             | ✔️        | https://mqtt.org/ |
| Modbus RTU                       | ❌             | ✔️        | https://modbus.org/ |
| OPC UA                           | ❌             | ✔️        | https://opcfoundation.org/ |
| OPC DA                           | ❌             | ✔️        | https://opcfoundation.org/ |
| Siemens S7                       | ❌             | ✔️        | https://siemens.com/ |
| IEC 104                          | ❌             | ✔️        | IEC 60870-5-104 https://en.wikipedia.org/wiki/IEC_60870-5 |
| Johnson Controls Metasys API     | ❌             | ✔️        | https://www.johnsoncontrols.com/ |
| Honeywell EBI                    | ❌             | ✔️        | https://www.honeywell.com/ |
| SIEMENS Desigo CC                | ❌             | ✔️        | https://siemens.com/ |
| QWeather API                     | ❌             | ✔️        | https://www.qweather.com/ |
| Ingest from MySQL                | ❌             | ✔️        | https://www.mysql.com/ |
| Ingest from Microsoft SQL Server | ❌             | ✔️        | https://www.microsoft.com/en-us/sql-server/ |
| Ingest from PostgreSQL           | ❌             | ✔️        | https://www.postgresql.org/ |
| Ingest from Oracle               | ❌             | ✔️        | https://www.oracle.com/database/ |
| Ingest from MongoDB              | ❌             | ✔️        | https://www.mongodb.com/ |
| Ingest from InfluxDB             | ❌             | ✔️        | https://www.influxdata.com/products/influxdb/ |
| FDD Rule Engine                  | ❌             | ✔️        | Requires standard component license or custom development |
| Alarm via Alibaba Cloud SMS Service| ❌           | ✔️        | https://www.aliyun.com/product/sms?userCode=8jwn6m8c |
| Advanced Reporting Engine        | ❌             | ✔️        | Requires standard component license or custom development |
| Prognose des Energieverbrauchs   | ❌             | ✔️        | Requires standard component license or custom development |
| Graphics Drawing Tool            | ❌             | ✔️        |                      |
| Equipments Remote Control        | ❌             | ✔️        | Requires standard component license or custom development |
| BACnet Server                    | ❌             | ✔️        | http://www.bacnet.org/ |
| Modbus TCP Server                | ❌             | ✔️        | https://modbus.org/ |
| OPC UA Server                    | ❌             | ✔️        | https://opcfoundation.org/ |
| MQTT Publisher                   | ❌️             | ✔️        | https://mqtt.org/ |
| iOS APP                          | ❌             | ✔️        | Requires standard component license or custom development |
| Android APP                      | ❌             | ✔️        | Requires standard component license or custom development |
| WeChat Mini Program              | ❌             | ✔️        | Requires standard component license or custom development |
| Alipay Mini Program              | ❌             | ✔️        | Requires standard component license or custom development |
| IPC Hardware Gateway (Data Acquisition and Remote Control）| ❌ | ✔️ | MyEMS certified industrial computer hardware |
| LoRa Radio Module (Data Acquisition and Remote Control）| ❌ | ✔️ | MyEMS certified LoRa hardware device |
| Protocol for Uploading to Provincial Platform of On-line monitoring system for Key Energy-Consuming Unit | ❌ | ✔️ | Requires standard component license or custom development |
| 3rd Party Systems Integration Service | ❌        | ✔️        | Custom development |
| Online software training         | ❌             | ✔️        |                      |
| Face to face software training   | ❌             | ✔️        |                      |
| Online Community Customer Support| ✔️              | ✔️        |                      |
| Email Customer Support           | ❌             | ✔️        |                      |
| Telephone Customer Support       | ❌             | ✔️        |                      |
| WeChat Customer Support          | ❌             | ✔️        |                      |
| Remote Desktop Customer Support  | ❌             | ✔️        |                      |
| Onsite Customer Support          | ❌             | ✔️        |                      |
| Bidding Support Service          | ❌             | ✔️        |                      |
| Customize Support Service        | ❌             | ✔️        |                      |

## MyEMS Screenshot
![MyEMS Space EnergyCategory1](/docs/images/myems-space-energycategory1.gif)
![MyEMS Space EnergyCategory2](/docs/images/myems-space-energycategory2.gif)
![MyEMS Space EnergyCategory3](/docs/images/myems-space-energycategory3.gif)
![MyEMS Large Screen Dashboard](/docs/images/myems-large-screen-dashboard.gif)

## MyEMS Roadmap

[Community Edition Roadmap](https://github.com/orgs/MyEMS/projects)
