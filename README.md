## Denis Skryabin
### Yeticrab
### test work for javascript developer

###  Stack:
```sh
html
scss
react
```

###  Run development mode

#### Установить проект
```sh
$ git clone https://github.com/SDen4/yeticrab_test_work.git/
$ cd yeticrab_test_work
$ npm i
```

#### Установить виртуальный сервер

###### 1. Открыть новый терминал

###### 2. Перейти в папку файла базы данных json
```sh
    cd json
```

###### 3. Установить json-server
```sh
    $ npm i -g json-server
```

###### 4. Запустить виртуальный сервер
```sh
    $ json-server --watch db.json
```

#### Запустить dev-server из корня проекта
```sh
$ npm run dev
```
#### API json-server


###### URL:

>http://localhost:3000/

###### Получить список заявок:

>GET    /orders

###### Получить заявку:

>GET    /orders/**{id}**
>
>где **{id}** - id заявки

###### Создать новую заявку:

>POST    /orders

###### Сортировка список заявок:

>/orders?_sort=**{field}**,views&>_order=**{direction}**
>
>где **{field}** - поле, по которому осуществляется сортировка
>
>    **{direction}** - направление сортировки: "asc" или "desc".

###### Изменение элемента список заявок:

>PATCH    /orders/**{id}**
>
>где **{id}** - id заявки