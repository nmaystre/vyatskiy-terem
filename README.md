## Плагины для gulp

+ gulp  - сам gulp
+ gulp-autoprefixer - автоматические добавляет браузерные префиксы
+ gulp-uglify - минифицирует js файлы
+ gulp-sass - компилятор sass
+ gulp-minify-css - минифицирует css
+ gulp-useref - парсит все что стоит между
              (<!--build:css file.css--> <!--endbuild-->) и конкатенирует
              описанные в них стили и скрипты
+ gulp-if - заменяет if
+ rimraf - удаляет файлы
+ browser-sync - поднимает локальный сервер
+ wiredep - подключает библиотеки из bower.json между кострукциями
          (<!-- bower:js --> <!-- endbower -->)

## Файл gulpfile.json

#### КОМАНДЫ:

+ gulp - поднимает сервер и следит за изменениями в файлах
+ gulp clean - удаляет папку с билдом проекта (www - по умолчанию)
+ gulp build - собирает build проекта (www - по умолчанию)

=============================================================================
||                                                                         ||
||   Для изменения папки билда нужно изменить ПУТИ в файле gulpfile.json   ||
||                                                                         ||
=============================================================================
