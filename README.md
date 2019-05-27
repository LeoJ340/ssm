# ssm框架整合案例

本案例基于spring springmvc mybatis框架整合，前端使用jquery实现的前后端半分离项目<br/>
##### 欢迎star、fork学习

## 关于案例
### 环境
    开发环境：jdk8+mysql8+IDEA+tomcat+maven
    后端：spring+springmvc+mybatis
    前端：jQuery+bootstrap
### 需求
    实现用户的基本增删改查
### 项目结构
    ├── README.md 
    ├── pom.xml
    └── src
        └── main
            ├── java
            │   └── cpm
            │       └── jsj
            │           ├── controller  -- SpringMVC-WEB层控制器(api接口)
            │           ├── mapper  -- Mybatis接口和映射文件。本项目采用了mybatis的接口开发，所以接口和映射文件放在同一目录下，并且名称相同。
            │           ├── bean  -- JavaBean实体类
            │           └── service  -- service业务层
            ├── resources  -- maven项目存放配置文件的根目录(classpath:)
            │   ├── ssm.sql  -- 项目数据库创建和表创建的SQL语句
            │   ├── log4j.properties  -- 日志打印配置文件
            │   └── db.properties  -- 数据源配置文件
            │   └── spring.xml  -- spring整合mybatis的配置文件
            │   └── SpringMvc.xml  -- springmvc的配置文件
            └── webapp  -- 项目的根目录
                ├── WEB-INF
                ├── bootstrap-4.3.1-dist  -- bootstrap依赖文件
                └── css  -- 样式文件
                └── js  -- javascript脚本文件
                └── index.html  -- 页面

