function ToDoList () {                                                      //п1    Создаем конструктор функций
    let todos = [                                                           //п18   Создаем массив объектов
        {
            id: '1',
            task: 'Выучить js',
            isDone: false,
            isEdit: false,             
        },
        {
            id: '2',
            task: 'Выучить css',
            isDone: false,
            isEdit: false,               
        }
    ];                                                       

    this.init = (className) => {                                            //п4    Создаем метод инициализации ToDoList в который принимаем значение класса
        const parentConteiner = document.querySelector(`.${className}`);    //п6    Находим блок по принимаемому классу 
        if(!parentConteiner) {                                              //п7    Делаем проверку на ошибку в значении класса
            console.log('Ошибка в указании селектора класса');
            return;
        }
        
        const elementHTMLToDo = createHTMLToDo();                           //п13   Создаем переменную, в котрой вызываем метод createHTMLToDo
        parentConteiner.appendChild(elementHTMLToDo);                       //п14   Переменную записываем в нужный блок с принимаемым классом
        addToDoInputEvent();                                                //п32   Вызываем метод                                       
        showToDoTask();                                                     //п33   Вызываем метод для того, что бы сразу отображалось, что список дел пуст
        addDeleteAllTodosEvent();                                           //п38   Вызывапем метод                              
        addSelectAllTodosEvent();
    }

    const addDeleteAllTodosEvent = () => {                                  //п34   Создаем метод удаления всего списка
        const deleteAllBtn = document.querySelector('.delete__all__btn');   //п35   Ищем кнопку удаления списка по селектору
        deleteAllBtn.addEventListener('click', () => {                      //п36   Вешаем событие по клику на кнопку
            if(todos.length !== 0) {                                        //п37   Если массив не пустой, массив делаем пустым и вызывааем отрисовку заново
                todos = [];
                showToDoTask();
            }
            return;
        })
    }

    const addToDoInputEvent = () => {                                       //п15   Создаем метод для поиска инпута и вешаем на него события
        const toDoInput = document.querySelector('.todo__input');           //п16   Находим инпут по селектору классов
        toDoInput.addEventListener('keydown', (event) => {                  //п17   На найденный инпут вешаем слушателя
            if(event.keyCode === 13) {                                      //п19   Создаем условие "при нажатии на ввод, мы пушим в наш массив новые объекты"
                todos.push(
                    {
                        id: `${new Date().getTime()}`,                      //      id формируется из объекта времени св-ва getTime, возвращает число миллисекунд, прошедших с 1 января 1970 года GMT+
                        task: event.target.value,
                        isDone: false,
                        isEdit: false,     
                    }
                )                       
                event.target.value = '';                                    //п20   После каждого добавления элемента очищаем значение инпута
                showToDoTask();                                             //п31   Вызываем метод для отрисовки списка дел                                     
            }
        })
    }

    const createHTMLToDo = () => {                                          //п8    Создаем метод для HTML-разметки ToDoList
        const todoElement = document.createElement('div');                  //п9    Создаем обертку ToDoList
        todoElement.classList.add('todo');                                  //п10   Создаем класс для обертки
        todoElement.innerHTML = `<div class="todo__wrapper">    
                                    <div class="todo__header">
                                        <h2 class="todo__title">Список дел</h2>
                                        <input type="text" class="todo__input">
                                        <div class="all__btns">
                                            <button class="select__all__btn btn">Выделить список</button>
                                            <button class="delete__all__btn btn">Очистить список</button>
                                        </div>                                        
                                    </div>
                                    <div class="todo__body"></div>
                                 </div>`                                    //п11   Описывваем структуру ToDoList
        return todoElement;                                                 //п12   Результатом метода является возврат элемента
    }

    const showToDoTask = () => {                                            //п21   Создаем метод для постоянного обновления разметки
        const todoBody = document.querySelector('.todo__body');             //п22   По слектору класса находим блок, в котором обновляется разметка
        if(todos.length === 0){                                             //п23   Если в массиве элементов нет, выводим строку "Список дел пуст"
            todoBody.innerHTML = '<h2 class="empty__resalt">Список дел пуст</h2>';
            return;
        }

        console.log(todos);

        const ul = document.createElement('ul');                            //п24   Создаем список 
        ul.classList.add('todo__tasks');                                    //п25   Присваиваем класс списку

        let listToDo = '';                                                  //п26   Создаем переменную для пустого списка дел через let, так как она может меняться 
        const chackEdit = checkEditTodoHelper();
        todos.forEach(({id, task, isDone, isEdit}) => {                     //п27   Используем метод перебора массива и закидываем в элементы списока элементы массива
            listToDo += `<li class="todo__task${isDone ? " isDone": ""}">
                            ${!isEdit ? `<input type="checkbox" ${isDone ? "checked": ""} id="${id}" class="todo__checkbox">
                            <p class="todo__task__content">${task}</p>
                            <div class="todo__btn">
                                <button class="todo__delete__btn btn" ${!isDone ? "disabled": ""} data-delete="${id}">Удалить</button> 
                                <button class="todo__edit__btn btn" ${chackEdit ? "disabled": ""} data-edit="${id}">Редактировать</button>
                            </div>`                            
                            :`
                            <input type="text" value="${task}" class="todo__edit__input">
                            <div class="todo__btn">
                                <button class="todo__edit__cancel btn" data-edit-cancel="${id}">Отменить</button>
                                <button class="todo__edit__save btn" data-edit-save="${id}">Сохранить</button>                            
                            </div>
                            `}                            
                        </li>`;
        })

        //в li навешиваем флаг ${isDone ? " isDone": ""}, если дело сделано, то присваиваем класс "isDone", иначе ничего не навешиваем
        //добавляем логику в инпут ${isDone ? "checked": ""}, если дело сделано, то присваивается атрибут checked, иначе ничего не вешаем
        //добавляем id в инпут, котрый равен id нашего объекта id="${id}"
        //добавляем в кнопку Удалить атрибут data-delete="${id}" (так как в HTML не можем использовать атрибут id несколько раз), что бы можно было обратиться к id
        //добавляем в кнопку Удалить логику ${!isDone ? "disabled": ""}, если дело не сделано, присваиваем атрибут disabled
        
        ul.innerHTML = listToDo;                                            //п28   Закибываем в список наши li
        todoBody.innerHTML = '';                                            //п29   Очищаем нужный блок, что бы небыло повторения списков ul при повторном поиске блока(п22)
        todoBody.appendChild(ul);                                           //п30   Закидываем весь список в нужный блок

        addCheckBoxEvent();                                                 //п51   Запускаем метод      
        addDeleteTodoEvent();                                               //п60   Запускаем метод
        addEditTodoEvent();
        
        if(chackEdit) {
            addEditCancelTodo();
            addEditSavelTodo();
        }        
    }

    const checkEditTodoHelper = () => {
        return todos.some(({isEdit}) => isEdit)
    }

    const addEditCancelTodo = () => {
        const cancelButton = document.querySelector('.todo__edit__cancel');
        cancelButton.addEventListener('click', (event) => {
            const btn = event.target;
            const todoId = btn.dataset.editCancel;
            // todos = todos.map((todo) => {
            //     if(todo.id === todoId){
            //         todo.isEdit = false;
            //     }
            //     return todo;
            // });
            todos = todos.map((todo) => ({                            //более современный способ
                    ...todo,                                         //через спрэт-оператор (...) для перезаписи свой-ств
                    ...(todo.id === todoId ? {isEdit: false} : undefined)
                })
            );
            showToDoTask();
        })
    }

    const addEditSavelTodo = () => {
        const saveButton = document.querySelector('.todo__edit__save');
        saveButton.addEventListener('click', (event) => {
            const btn = event.target;
            const todoId = btn.dataset.editSave;
            const newTaskValue = document.querySelector('.todo__edit__input').value;
            // todos = todos.map((todo) => {
            //     if(todo.id === todoId){
            //         todo.isEdit = false;
            //         todo.task = newTaskValue;
            //     }
            //     return todo;
            // }); 
            todos = todos.map((todo) => ({                            //более современный способ
                    ...todo,                                         //через спрэт-оператор (...) для перезаписи свой-ств
                    ...(todo.id === todoId ? {
                        isEdit: false,
                        task: newTaskValue,
                    } : undefined),
                })
            );          
            showToDoTask();
        })
    }

    const addEditTodoEvent = () => {
        const editButtons = document.querySelectorAll('.todo__edit__btn');
        editButtons.forEach((editButton) => {
            editButton.addEventListener('click', (event) => {
                const btn = event.target;
                const todoId = btn.dataset.edit;                     //обращаемся к атрибуту - dataset.edit
                todos = todos.map((todo) =>{
                    if(todo.id === todoId){
                        todo.isEdit = true;
                    }
                    return todo;
                });
                showToDoTask();
            })
        })
    }

    const addDeleteTodoEvent = () => {                                       //п52  Метод удаления одного дела по кнопке Удалить
        const deleteButtons = document.querySelectorAll('.todo__delete__btn');  //п53   Находим все кнопки Удалить по селектору классов
        deleteButtons.forEach((deleteButton) => {                           //п54   Перебираем массив 
            deleteButton.addEventListener('click', (event) => {             //п55   На каждую кнопку вешаем событие по клику с аргументом event
                const btn = event.target;                                   //п56   Обращаемся к элементу
                const todoId = btn.dataset.delete;                          //п57   Обращаемся к атрибуту delete через dataset.delete
                todos = todos.filter((todo) => todo.id !== todoId);         //п58   Фильтруем список (возвращаем все элементы массива, кроме того, на который нажал Удалить)
                showToDoTask();                                             //п59   Запускаем отрисовку
            })
        })
    }

    const addCheckBoxEvent = () => {                                        //п39   Метод для нахождения чекбокса и события для него
        const checkBoxs = document.querySelectorAll('.todo__checkbox');     //п40   Находим все чекбоксы по селектору классов
        checkBoxs.forEach((checkbox) => {                                   //п41   Перебираем массив, что бы навесить на каждый элемент обработчик событий                         
            checkbox.addEventListener('change', (event) => {                //п42   Вешаем обработчик события change
                const todoId = event.target.id;                             //п43   Возвращаем id чекбокса по которому кликнули
                changeStatusTodo(todoId);                                   //п50   Запускаем метод, входным аргументом которого является todoId
            })
        })
    }

    const changeStatusTodo = (todoId) => {                                  //п44   Метод для того, что бы перемапить наш массив передавая todoId
        todos = todos.map((todo) => {                                       //п45   Используем метод map (на каждой итерации возвращает элемент массива), что бы образовать новый массив
            if(todo.id === todoId) {                                        //п46   Если id элемента равен todoId, которое мы получили из клика на чекбокс
                todo.isDone = !todo.isDone                                  //п47   Тогда мы обращаемся к св-ву isDone и меняем его на противоположное значение
            }
            return todo                                                     //п48   Возвращаем элемент массива
        })
        showToDoTask();                                                     //п49   Запускаем перерисовку
    }

    const addSelectAllTodosEvent = () => {                                  //создаем метод выделения всего списка
        const selectAllBtn = document.querySelector('.select__all__btn');   //ищем кнопку выделения списка по селектору
        selectAllBtn.addEventListener('click', () => {                      //вешаем событие по клику на кнопку
            todos.forEach((todo) => {                                       //перебираем массив
                if(todo.isDone === false) {                                //если сво-во isDone = false, тогда обращаемся к этому объекту массива
                    todo.isDone = !todo.isDone                              //меняем значение isDone на противоположное                       
                }
                return todo;                                                //возвращаем объект               
            })
            showToDoTask();                                                 //Запускаем перерисовку
        })         
    }
}

window.addEventListener('load', () => {                                     //п2    Создаем обработчик событий для выполнения кода после загрузки dom
    const todo = new ToDoList();                                            //п3    Создали объект, на основе функции с помощью new
    todo.init('app');                                                       //п5    Запускаем метод инициализации, в который передаем значение класса
    
})


