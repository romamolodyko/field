var Field = (function () {

    var constructor = function (options, items) {
        this.container = options.container || '#container';
        this.parentSelector = options.parentSelector || '.list_prod';
        this.items = items || [];
        this.fieldItem = new FieldItem(this.container);
    }, self = constructor.prototype;

    self.render = function () {
        var button = $('<div class="field__button field__button-add">+</divcla>');
        $(this.container).append(button);
        this.addFieldHandler();
    };

    self.removeFieldHandler = function () {
        var self = this;
        $(this.parentSelector).on('click', '.field__button-delete', function () {
            $(this).closest(self.parentSelector).remove();
        });
    };

    self.addFieldHandler = function () {
        $(this.container).on('click', '.field__button-add', function () {
            this.addField();
        }.bind(this));
    };

    self.find = function (selector) {
        return $(this.parentSelector).find(selector);
    };

    self.addField = function () {
        if($(this.container).length) {
            var field = this.createFieldHtml();
            $(this.container).append(field);
            this.addItems(field);
        }
        this.removeFieldHandler();
    };

    self.createFieldHtml = function () {
        var field = $('<div></div>');
        field.attr('class', this.clear(this.parentSelector));
        field.attr('data-id', this.getLastId());

        var deleteButton = $('<div class="field__button field__button-delete">-</div>');

        field.append(deleteButton);

        return field;
    };

    self.addItems = function (field) {
        var self = this;
        this.items.forEach(function (e) {
            self.fieldItem.render(field, e);
        })
    };

    self.getLastId = function () {
        var id = parseInt($(this.container).find(this.parentSelector + ':last').data('id'))+1;
        return (id) ? id : 0;
    };

    self.clear = function (selector) {
        return selector.substr(1);
    };

    return constructor;
}());

var FieldItem = (function () {
    var constructor = function (container) {
        this.parentSelector = container || '#container';
        this.field = '';
    }, self = constructor.prototype;

    self.init = function (field, items) {
        this.render(field, items);
    };

    self.createField = function () {
        var field = $('<div class="field__item"></div>'),
            buttonAdd = $('<div class="field__button field__button-add_item">+</div>'),
            buttonRemove = $('<div class="field__button field__button-delete_item">-</div>');
        field.append(buttonAdd);
        field.append(buttonRemove);

        return field;
    };

    self.render = function (field, item) {
        var f = this.createField();

        var i = $(item);
        i.addClass('field__input');

        f.append(i);
        field.append(f);
        this.clickHandler(f);

    };

    self.clickHandler = function (field) {
        field.on('click', '.field__button', function () {
           $(this).closest('.field__item').toggleClass('active');
        });
    };

   return constructor;
}());
