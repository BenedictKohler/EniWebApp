create table Team 
(
    teamId int not null identity,
    teamName char(50),
    primary key (teamId)
);

create table Person
(
    personId int not null identity,
    username char(30) not null,
    password char(30) not null,
    fullName char(50),
    primary key (personId),
    teamId int FOREIGN key REFERENCES Team (teamId)
);

create table Environment
(
    environmentId int not null identity,
    name char(50),
    status char(20),
    startDate Date,
    endDate Date,
    primary key (environmentId),
    teamId int FOREIGN key REFERENCES Team (teamId),
    ownerId int FOREIGN key REFERENCES Person (personId)
);

create table Pipeline
(
    pipelineId int not null identity,
    armId int,
    ansibleId int,
    primary key (pipelineId),
    environmentId int FOREIGN key REFERENCES Environment (environmentId)
);

create table Server
(
    serverId int not null identity,
    name char(50),
    type char(30),
    ipAddress char(20),
    primary key (serverId),
    environmentId int FOREIGN key REFERENCES Environment (environmentId)
);

create table Software 
(
    softwareId int not null identity,
    version char(40),
    name char(40),
    location varchar(150),
    primary key (softwareId),
    serverId int FOREIGN KEY REFERENCES Server (serverId)
);

insert into team (teamName) values ('Ansible');
insert into person (username, password, fullName, teamId) values ('michael', '1234', 'Michael Olutunji', 1);
insert into environment (name, status, startDate, endDate, teamId) values ('Env2', 'Unallocated', '2019-03-04', '2020-12-01', 2);
insert into server (name, type, ipAddress, environmentId) values ('Server3', 'VM', '109.02.1.6', 2);
insert into software (version, name, serverId) values ('2.3.0', 'node', 3);

-- Query to get information about all environments
select environmentId, fullName, name, status, startDate, endDate, teamName from environment join team on environment.teamId = team.teamId left outer join Person on Environment.ownerId = Person.personId;

-- Gets information about servers on a certain environment
select name, type, ipAddress from server where environmentId = 1;

-- Get information about software installed on a server
select version, name from Software where serverId = 1;