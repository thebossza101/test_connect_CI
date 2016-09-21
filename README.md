# test_connect_CI
conect PHP Cl and view PDF (google drive api)


#installationg

```ruby
git clone https://github.com/thebossza101/test_connect_CI.git myproject
```

```ruby
cd myproject
```

```ruby
npm install
```

```ruby
ionic state restore
```

------------------------------------------------------------------
#Add platform

```ionic platform add android ``` //  build app Android 

```ionic platform add ios``` //  build app iOS

------------------------------------------------------------------
#Remove platform

```ionic platform rm android ``` //  build app Android 

```ionic platform rm ios``` //  build app iOS

------------------------------------------------------------------
#Run Application to Device

```ionic run android```	//For android

```ionic run ios```	//For ios

```
Note: 
การรันไปเครืองทดสอบจริง อย่าลืมต่อสาย USB 
และเปิด Developer Options ในเครืองด้วย 
ถ้าเป็น Android ปกติเข้าที เมนู Setting->About phone->Build Number (กดตอ่เนือง 7 ครัง)
ติกถูกที Stay awake->ติกถูกที USB Debugging 
```

------------------------------------------------------------------
#Run Application to Browser

```ionic serve```

```ionic serve -l``` //3 platform -> Android, iOS and Windows 

------------------------------------------------------------------
#Update Ionic Application

```npm install -g ionic@beta```

```npm install``` //change to version in "package.json"

------------------------------------------------------------------
#IONIC CLI COMMANDS

```ionic <command> <option>```

```ionic g [page|component|directive|pipe|provider|tabs]```

```ionic g --list``` // ดูคำสั่งเกียวกับ generate 

Such as -- > ```ionic g page about –ts```

------------------------------------------------------------------
#create Project

```ionic start <Project Name> <Template> --v2 –ts```

Template -> 

 ```ionic start MyIonic2 --v2 –ts``` 		//<-- tabs 

 ```ionic start MyIonic2 blank --v2 --ts``` 	//<-- blank
 
 ```ionic start MyIonic2 sidemenu --v2 --ts``` 	//<-- sidemenu
 
 ------------------------------------------------------------------
#เครื่องมือที่ใช้

1. https://chocolatey.org/

2. ```choco install nodejs -y``` //ถ้าขึ้นต้นด้วย choco run cmd as admin

3. ```npm install -g ionic@beta```

4. ```npm install -g cordova```

5. ```choco install git.install -y```

6. ```choco install jdk8 -y -param "x64=true"```

7. ```choco install ant -y```

8. http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

- copy path... (C:\Program Files\Java\jdk1.8.0_101)

- JAVA_HOME

- ;%JAVA_HOME%\bin

9. https://developer.android.com/studio/index.html

- copy path... platform-tools , tools (C:\Users\user\AppData\Local\Android\sdk)
 
---------------------------------------------------------------------------------------
#Genymotion

```choco install genymotion -y```

---------------------------------------------------------------------------------------
#editor ใช้ Atom Package

atom-beautify

autoclose-html

color-picker

emmet

file-icons

highligtht-selected

linter

minimap

pigments

 
