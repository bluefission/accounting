var DashboardPagination = function (element, offset, batch, total) {
    this.offset = offset;
    this.batch = batch;
    this.total = total;
    this.pages = 1;
    this.current = 1;
    this._pageSelector = ".number";

    this.page = $(element + ' ' + this._pageSelector).clone();
    this.area = $(element);
};
DashboardPagination.prototype = {
    clear: function () {
        this.area.find(this._pageSelector).remove();
        this.area.find(".paginate_button").removeClass("disabled").removeClass("active");
    },
    load: function (offset, batch, total) {
        if (typeof offset !== 'undefined')
            this.offset = offset;
        if (typeof batch !== 'undefined')
            this.batch = batch;
        if (typeof total !== 'undefined')
            this.total = total;

        this.clear();

        this.calculate();
        var page = '';
        for (var i = 0; i < this.pages; i++) {
            page = this.page.clone();
            page.find("a").text(i + 1);
            if (i == this.current)
                page.addClass('active');
            page.find("a").attr("data-dt-idx", i);

            page.find("a").click(function (e) {
                e.preventDefault();
                this.current = $(e.target).attr("data-dt-idx") - 1;
                this.bindClick(e);
            }.bind(this));
            this.area.find(".next").before(page);
        }
        this.area.find(".next").attr("data-dt-idx", i+1);
        if (this.current == 0)
            this.area.find(".previous").addClass('disabled');

        if (this.current == this.pages-1)
            this.area.find(".next").addClass('disabled');

    },
    calculate: function () {
        this.pages = Math.floor(this.total / this.batch) + (this.total % this.batch ? 1 : 0);
        this.current = Math.floor(this.offset / this.batch);
    },
    bindClick: function (e) { }
};