# myems-normalization

MyEMS Normalization Service 

数据规范化服务

## Introduction

This service is a component of MyEMS. It normalizes energy data in historical database.

![MyEMS Meter Normalization](../docs/images/meter-normalization.png)

## Prerequisites

mysql-connector-python

openpyxl

sympy

python-decouple


## Quick Run for Development

```bash
cd myems/myems-normalization
pip install -r requirements.txt
cp example.env .env
chmod +x run.sh
./run.sh
```

## Installation

### Option 1: Install myems-normalization on Docker

In this section, you will install myems-normalization on Docker.

*  Copy example.env file to .env file and modify the .env file

```bash
cd myems/myems-normalization
cp example.env .env
```
* Build a Docker image
```bash
docker build -t myems/myems-normalization .
```
* Run a Docker container
```bash
docker run -d --restart always --name myems-normalization myems/myems-normalization
```

-d		Run container in background and print container ID

--restart	Restart policy to apply when a container exits

--name		Assign a name to the container

### Option 2: Install myems-normalization on Ubuntu Server (bare-metal or virtual machine)

In this section, you will install myems-normalization on Ubuntu Server.

Download and install MySQL Connector:
```bash
cd ~/tools
wget https://cdn.mysql.com/archives/mysql-connector-python-8.0/mysql-connector-python-8.0.23.tar.gz
tar xzf mysql-connector-python-8.0.23.tar.gz
cd ~/tools/mysql-connector-python-8.0.23
python3 setup.py install
```

Download and install mpmath
```bash
cd ~/tools
git clone https://github.com/fredrik-johansson/mpmath.git
cd ~/tools/mpmath
python3 setup.py install
```

Download and install SymPy
```bash
cd ~/tools
git clone https://github.com/sympy/sympy.git
cd ~/tools/sympy
python3 setupegg.py develop
```

Download and install openpyxl
```bash
cd ~/tools
```
Get the latest version of et_xmlfile from https://foss.heptapod.net/openpyxl/et_xmlfile/
```bash
wget https://foss.heptapod.net/openpyxl/et_xmlfile/-/archive/1.1/et_xmlfile-1.1.tar.gz
tar xzf et_xmlfile-1.1.tar.gz
```
Get jdcal
```bash
git clone https://github.com/phn/jdcal.git
```
Get the latest version of openpyxl from https://foss.heptapod.net/openpyxl/openpyxl
```bash
wget https://foss.heptapod.net/openpyxl/openpyxl/-/archive/3.0.7/openpyxl-3.0.7.tar.gz
tar xzf openpyxl-3.0.7.tar.gz
```

```bash
cd ~/tools/et_xmlfile-1.1
python3 setup.py install
cd ~/tools/jdcal
python3 setup.py install
cd ~/tools/openpyxl-3.0.7
python3 setup.py install
```

Download and install Python Decouple
```bash
cd ~/tools
git clone https://github.com/henriquebastos/python-decouple.git
cd ~/tools/python-decouple
python3 setup.py  install
```

Install myems-normalization service:
```
cd ~
git clone https://github.com/MyEMS/myems.git
cd myems
git checkout master (or the latest release tag)
cp -r ~/myems/myems-normalization /myems-normalization
```
Copy example.env file to .env file and modify the .env file:
```bash
cp /myems-normalization/example.env /myems-normalization/.env
nano /myems-normalization/.env
```
Setup systemd service:
```
cp myems-normalization.service /lib/systemd/system/
```
Enable the service:
```
systemctl enable myems-normalization.service
```
Start the service:
```
systemctl start myems-normalization.service
```
Monitor the service:
```bash
systemctl status myems-normalization.service
```
View the log:
```bash
cat /myems-normalization.log
```

### References

1.  https://myems.io
2.  https://dev.mysql.com/doc/connector-python/en/
3.  https://github.com/sympy/sympy
4.  https://openpyxl.readthedocs.io
