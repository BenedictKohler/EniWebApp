const { exec, spawn, execFile } = require("child_process");
const Helper = require('./Helper.js');

// Gets services running on machine
// Need to pass
exports.getServices = (req, res) => {

    let formattedServices = Helper.formatRunningServices(services);
    res.status(200).json(formattedServices);
    return;

    execFile('../../scripts/Services.ps1', ['-serviceName ' + req.params.serviceName], (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);

        let result = Helper.formatRunningServices(stdout);
        res.status(200).json(result);

      });

}

const services = `Status   Name               DisplayName
------   ----               -----------
Running  ModuleCoreService  McAfee Module Core Service
Running  UserManager        User Manager
Running  mpssvc             Windows Defender Firewall
Running  UnistoreSvc_b9ebc  User Data Storage_b9ebc
Running  UserDataSvc_b9ebc  User Data Access_b9ebc
Running  VaultSvc           Credential Manager
Running  mccspsvc           McAfee CSP Service
Running  mfemms             McAfee Service Controller
Running  UsoSvc             Update Orchestrator Service
Running  mfevtp             McAfee Validation Trust Protection ...
Running  MySQL80            MySQL80
Running  NlaSvc             Network Location Awareness
Running  TokenBroker        Web Account Manager
Running  nsi                Network Store Interface Service
Running  TimeBrokerSvc      Time Broker
Running  nvagent            Network Virtualization Service
Running  NcbService         Network Connection Broker
Running  UmRdpService       Remote Desktop Services UserMode Po...
Running  Netman             Network Connections
Running  TrkWks             Distributed Link Tracking Client
Running  netprofm           Network List Service
Running  HpTouchpointAna... HP Analytics service
Running  HPSysInfoCap       HP System Info HSA Service
Running  HvHost             HV Host Service
Running  InstallService     Microsoft Store Install Service
Running  IKEEXT             IKE and AuthIP IPsec Keying Modules
Running  HPAppHelperCap     HP App Helper HSA Service
Running  HP Comm Recover    HP Comm Recovery
Running  HPDiagsCap         HP Diagnostics HSA Service
Running  HPNetworkCap       HP Network HSA Service
Running  HPJumpStartBridge  HP JumpStart Bridge
Running  iphlpsvc           IP Helper
Running  lmhosts            TCP/IP NetBIOS Helper
Running  LivedriveVSSSer... Livedrive VSS Service
Running  LSM                Local Session Manager
Running  McAPExe            McAfee AP Service
Running  McAfee WebAdvisor  McAfee WebAdvisor
Running  LanmanServer       Server
Running  KeyIso             CNG Key Isolation
Running  LanmanWorkstation  Workstation
Running  LicenseManager     Windows License Manager Service
Running  lfsvc              Geolocation Service
Running  OneSyncSvc_b9ebc   Sync Host_b9ebc
Running  RtkBtManServ       Realtek Bluetooth Device Manager Se...
Running  RtkAudioUnivers... Realtek Audio Universal Service
Running  SamSs              Security Accounts Manager
Running  Schedule           Task Scheduler
Running  SQLWriter          SQL Server VSS Writer
Running  RmSvc              Radio Management Service
Running  SstpSvc            Secure Socket Tunneling Protocol Se...
Running  RpcEptMapper       RPC Endpoint Mapper
Running  RpcSs              Remote Procedure Call (RPC)
Running  SSDPSRV            SSDP Discovery
Running  Spooler            Print Spooler
Running  SessionEnv         Remote Desktop Configuration
Running  sonicwall_clien... SonicWall Client Protection Service
Running  SgrmBroker         System Guard Runtime Monitor Broker
Running  ShellHWDetection   Shell Hardware Detection
Running  SharedAccess       Internet Connection Sharing (ICS)
Running  SecurityHealthS... Windows Security Service
Running  SECOMNService      Sound Research SECOMN Service
Running  SEMgrSvc           Payments and NFC/SE Manager
Running  SONICWALL_NetEx... SonicWall NetExtender Service
Running  SENS               System Event Notification Service
Running  TabletInputService Touch Keyboard and Handwriting Pane...
Running  TapiSrv            Telephony
Running  PimIndexMainten... Contact Data_b9ebc
Running  PlugPlay           Plug and Play
Running  SystemEventsBroker System Events Broker
Running  TermService        Remote Desktop Services
Running  Themes             Themes
Running  PcaSvc             Program Compatibility Assistant Ser...
Running  TeamViewer         TeamViewer
Running  PEFService         McAfee PEF Service
Running  SysMain            SysMain
Running  StorSvc            Storage Service
Running  ProfSvc            User Profile Service
Running  stisvc             Windows Image Acquisition (WIA)
Running  StateRepository    State Repository Service
Running  RasMan             Remote Access Connection Manager
Running  postgresql-x64-13  postgresql-x64-13 - PostgreSQL Serv...
Running  PolicyAgent        IPsec Policy Agent
Running  Power              Power
Running  PrintWorkflowUs... PrintWorkflow_b9ebc
Running  SWGVCSvc           SonicWall Global VPN Client Service
Running  hns                Host Network Service
Running  BrokerInfrastru... Background Tasks Infrastructure Ser...
Running  DiagTrack          Connected User Experiences and Tele...
Running  DisplayEnhancem... Display Enhancement Service
Running  DispBrokerDeskt... Display Policy Service
Running  WinDefend          Microsoft Defender Antivirus Service
Running  camsvc             Capability Access Manager Service
Running  BthAvctpSvc        AVCTP service
Running  WildTangentHelper  WildTangentHelper
Running  DPS                Diagnostic Policy Service
Running  BITS               Background Intelligent Transfer Ser...
Running  WpnUserService_... Windows Push Notifications User Ser...
Running  BFE                Base Filtering Engine
Running  WpnService         Windows Push Notifications System S...
Running  Bonjour Service    Bonjour Service
Running  DoSvc              Delivery Optimization
Running  Dnscache           DNS Client
Running  CDPUserSvc_b9ebc   Connected Devices Platform User Ser...
Running  CryptSvc           Cryptographic Services
Running  DbxSvc             DbxSvc
Running  wlidsvc            Microsoft Account Sign-in Assistant
Running  ClickToRunSvc      Microsoft Office Click-to-Run Service
Running  ClipSVC            Client License Service (ClipSVC)
Running  CertPropSvc        Certificate Propagation
Running  CoreMessagingRe... CoreMessaging
Running  WinHttpAutoProx... WinHTTP Web Proxy Auto-Discovery Se...
Running  DeviceAssociati... Device Association Service
Running  Dhcp               DHCP Client
Running  DevQueryBroker     DevQuery Background Discovery Broker
Running  WlanSvc            WLAN AutoConfig
Running  DcomLaunch         DCOM Server Process Launcher
Running  cbdhsvc_b9ebc      Clipboard User Service_b9ebc
Running  CDPSvc             Connected Devices Platform Service
Running  Wcmsvc             Windows Connection Manager
Running  AppXSvc            AppX Deployment Service (AppXSVC)
Running  Appinfo            Application Information
Running  ETDService         ELAN Service
Running  EventLog           Windows Event Log
Running  EventSystem        COM+ Event System
Running  gpsvc              Group Policy Client
Running  PanGPS             PanGPS
Running  Winmgmt            Windows Management Instrumentation
Running  AnyDesk            AnyDesk Service
Running  AMD External Ev... AMD External Events Utility
Running  FontCache          Windows Font Cache Service
Running  WdNisSvc           Microsoft Defender Antivirus Networ...
Running  wscsvc             Security Center
Running  Audiosrv           Windows Audio
Running  DusmSvc            Data Usage
Running  WSearch            Windows Search
Running  WebClient          WebClient
Running  wuauserv           Windows Update
Running  AudioEndpointBu... Windows Audio Endpoint Builder
Running  WdiServiceHost     Diagnostic Service Host
Stopped  XboxNetApiSvc      Xbox Live Networking Service
Stopped  WwanSvc            WWAN AutoConfig
Stopped  spectrum           Windows Perception Service
Stopped  XboxGipSvc         Xbox Accessory Management Service
Stopped  smphost            Microsoft Storage Spaces SMP
Stopped  swprv              Microsoft Software Shadow Copy Prov...
Stopped  WPDBusEnum         Portable Device Enumerator Service
Stopped  SmsRouter          Microsoft Windows SMS Router Service.
Stopped  WpcMonSvc          Parental Controls
Stopped  XblAuthManager     Xbox Live Auth Manager
Stopped  sppsvc             Software Protection
Stopped  ssh-agent          OpenSSH Authentication Agent
Stopped  svsvc              Spot Verifier
Stopped  ss_conn_launche... SAMSUNG Mobile USB Connectivity Lau...
Stopped  SNMPTRAP           SNMP Trap
Stopped  workfolderssvc     Work Folders
Stopped  XblGameSave        Xbox Live Game Save
Stopped  vmickvpexchange    Hyper-V Data Exchange Service
Stopped  WdiSystemHost      Diagnostic System Host
Stopped  wcncsvc            Windows Connect Now - Config Registrar
Stopped  WbioSrvc           Windows Biometric Service
Stopped  vmicrdv            Hyper-V Remote Desktop Virtualizati...
Stopped  vds                Virtual Disk
Stopped  Wecsvc             Windows Event Collector
Stopped  vmcompute          Hyper-V Host Compute Service
Stopped  vmicheartbeat      Hyper-V Heartbeat Service
Stopped  vmicguestinterface Hyper-V Guest Service Interface
Stopped  W32Time            Windows Time
Stopped  WaaSMedicSvc       Windows Update Medic Service
Stopped  VSStandardColle... Visual Studio Standard Collector Se...
Stopped  vmicvss            Hyper-V Volume Shadow Copy Requestor
Stopped  VSS                Volume Shadow Copy
Stopped  wbengine           Block Level Backup Engine Service
Stopped  vmicshutdown       Hyper-V Guest Shutdown Service
Stopped  WarpJITSvc         WarpJITSvc
Stopped  vmictimesync       Hyper-V Time Synchronization Service
Stopped  WalletService      WalletService
Stopped  WinRM              Windows Remote Management (WS-Manag...
Stopped  wisvc              Windows Insider Service
Stopped  vmicvmsession      Hyper-V PowerShell Direct Service
Stopped  TrustedInstaller   Windows Modules Installer
Stopped  TroubleshootingSvc Recommended Troubleshooting Service
Stopped  wmiApSrv           WMI Performance Adapter
Stopped  WMPNetworkSvc      Windows Media Player Network Sharin...
Stopped  WManSvc            Windows Management Service
Stopped  TieringEngineSe... Storage Tiers Management
Stopped  wlpasvc            Local Profile Assistant Service
Stopped  WerSvc             Windows Error Reporting Service
Stopped  WFDSConMgrSvc      Wi-Fi Direct Services Connection Ma...
Stopped  wercplsupport      Problem Reports Control Panel Support
Stopped  VacSvc             Volumetric Audio Compositor Service
Stopped  WEPHOSTSVC         Windows Encryption Provider Host Se...
Stopped  UdkUserSvc_b9ebc   Udk User Service_b9ebc
Stopped  tzautoupdate       Auto Time Zone Updater
Stopped  uhssvc             Microsoft Update Health Service
Stopped  upnphost           UPnP Device Host
Stopped  WiaRpc             Still Image Acquisition Events
Stopped  EFS                Encrypting File System (EFS)
Stopped  edgeupdatem         Microsoft Edge Update Service (edg...
Stopped  edgeupdate          Microsoft Edge Update Service (edg...
Stopped  Fax                Fax
Stopped  EntAppSvc          Enterprise App Management Service
Stopped  embeddedmode       Embedded Mode
Stopped  dot3svc            Wired AutoConfig
Stopped  dmwappushservice   Device Management Wireless Applicat...
Stopped  DmEnrollmentSvc    Device Management Enrollment Service
Stopped  Eaphost            Extensible Authentication Protocol
Stopped  DsSvc              Data Sharing Service
Stopped  DsmSvc             Device Setup Manager
Stopped  gupdatem           Google Update Service (gupdatem)
Stopped  gupdate            Google Update Service (gupdate)
Stopped  GraphicsPerfSvc    GraphicsPerfSvc
Stopped  IpxlatCfgSvc       IP Translation Configuration Service
Stopped  icssvc             Windows Mobile Hotspot Service
Stopped  hidserv            Human Interface Device Service
Stopped  fhsvc              File History Service
Stopped  FDResPub           Function Discovery Resource Publica...
Stopped  fdPHost            Function Discovery Provider Host
Stopped  GoogleChromeEle... Google Chrome Elevation Service
Stopped  FrameServer        Windows Camera Frame Server
Stopped  FileSyncHelper     FileSyncHelper
Stopped  diagsvc            Diagnostic Execution Service
Stopped  BDESVC             BitLocker Drive Encryption Service
Stopped  BcastDVRUserSer... GameDVR and Broadcast User Service_...
Stopped  AxInstSV           ActiveX Installer (AxInstSV)
Stopped  bthserv            Bluetooth Support Service
Stopped  BTAGService        Bluetooth Audio Gateway Service
Stopped  BluetoothUserSe... Bluetooth User Support Service_b9ebc
Stopped  AppIDSvc           Application Identity
Stopped  ALG                Application Layer Gateway Service
Stopped  AJRouter           AllJoyn Router Service
Stopped  autotimesvc        Cellular Time
Stopped  aspnet_state       ASP.NET State Service
Stopped  AppReadiness       App Readiness
Stopped  DeviceInstall      Device Install Service
Stopped  DeviceAssociati... DeviceAssociationBroker_b9ebc
Stopped  defragsvc          Optimize drives
Stopped  diagnosticshub.... Microsoft (R) Diagnostics Hub Stand...
Stopped  DevicesFlowUser... DevicesFlow_b9ebc
Stopped  DevicePickerUse... DevicePicker_b9ebc
Stopped  ConsentUxUserSv... ConsentUX_b9ebc
Stopped  COMSysApp          COM+ System Application`