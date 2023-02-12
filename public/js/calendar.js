function Calendar() {
    let state = null;
    let container, title, prev, next, year_month, list;
    let yearList = {}, minYear, maxYear;
    let input = document.getElementById("calendarInput");
    let month_name = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    };
    function init(element) {
        state = {
            current: new Date(),
            mode: "date",
        }
        state.today = new Date(state.current);
        createDOM(element);
        render(state.mode);
        bindingListener();
    }

    function createDOM(element) {
        container = document.createElement("div");
        title = document.createElement("div");
        prev = document.createElement('span');
        next = document.createElement('span');
        year_month = document.createElement("div");

        title.className = "title";
        prev.id = "prev";
        prev.innerHTML = "&#10094;";
        next.id = "next";
        next.innerHTML = "&#10095;";
        year_month.id = "year_month";

        title.appendChild(prev);
        title.appendChild(year_month);
        title.appendChild(next);


        list = document.createElement("div");
        list.className = "list";
        list.id = "list";

        container.className = "container";
        container.style.display = "none";

        container.appendChild(title);
        container.appendChild(list);
        element.appendChild(container);
    }

    function render(mode) {
        year_month.innerText = "";
        list.innerText = "";

        switch (mode) {
            case "date":
                calendarRender(list, year_month);
                break;
            case "month":
                monthRender(list, year_month);
                break;
            case "year":
                yearRender(list, year_month);
                break;
        }

    }
    function calendarRender(container, title) {
        title.innerText = month_name[state.current.getMonth()] + " " + state.current.getFullYear();
        let date = new Date(state.current.getFullYear(), state.current.getMonth(), 1);
        //計算上月要顯示的天數
        let showDate = new Date(date.getFullYear(), date.getMonth(), state.current.getDate());
        let prevMonthDay = date.getDay() || 7;

        //日曆面板上的日期每增加一個迴圈週期是一天，獲取一天的毫秒數
        var cycle = 1E3 * 60 * 60 * 24;

        for (let i = 1; i < 43; i++) {
            let preDay = +state.current + (i - prevMonthDay - showDate.getDate()) * cycle;
            let preDate = new Date(preDay);
            renderDate(preDate, container);
        }
    }

    function monthRender(container, title) {
        title.innerText = state.current.getFullYear();
        for (month in month_name) {
            let ele = document.createElement("div");
            ele.className = "month";
            if (month == state.current.getMonth()) {
                ele.classList.add("active");
            }
            ele.innerText = month_name[month];
            ele.setAttribute("month-index", month);
            container.appendChild(ele);
            ele.addEventListener("click", selectMonth);
        }
    }

    function yearRender(container, title) {
        minYear = state.current.getFullYear() - 9;
        maxYear = state.current.getFullYear() + 2;
        title.innerText = minYear + "-" + maxYear;
        for (let i = 12; i > 0; i--) {
            let ele = document.createElement("div");
            ele.className = "year";
            ele.innerText = (state.current.getFullYear() + 2) - i;
            ele.setAttribute("year-index", i);
            container.appendChild(ele);
            ele.addEventListener("click", selectYear);
            if (ele.innerText == state.current.getFullYear()) {
                ele.classList.add("active");
            }
            if (i == 12 || i == 1) {
                ele.classList.add("grayDate");
            }
            yearList[ele.innerText] = ele
        }
    }



    function renderDate(date, container) {
        let ele = document.createElement("div");
        ele.className = "date";
        if (date.getDate() == state.today.getDate() && date.getMonth() == state.today.getMonth()) {
            ele.classList.add("today");
        }

        if (date.getDate() == state.current.getDate() && date.getMonth() == state.current.getMonth()) {
            ele.classList.add("active");
        }

        if (date.getMonth() !== state.current.getMonth()) {
            ele.classList.add("grayDate");
        }
        ele.innerText = date.getDate();
        ele.addEventListener("click", selectDate);
        container.appendChild(ele);
    }

    function prevDate() {
        state.current.setDate(state.current.getDate() - 1);
        render(state.mode);
    }

    function nextDate() {
        state.current.setDate(state.current.getDate() + 1);
        render(state.mode);
    }

    function prevMonth() {
        state.current.setMonth(state.current.getMonth() - 1);
        state.mode = "month";
        render(state.mode)
    }

    function nextMonth() {
        state.current.setMonth(state.current.getMonth() + 1);
        state.mode = "month";
        render(state.mode);
    }

    function prevYear() {
        if (state.current.getFullYear() - 1 >= minYear) {
            yearList[state.current.getFullYear()].classList.remove("active");
            yearList[state.current.getFullYear() - 1].classList.add("active");
            state.current.setFullYear(state.current.getFullYear() - 1);
        } else {
            state.current.setFullYear(state.current.getFullYear() - 1);
            state.mode = "year";
            render(state.mode);
        }
    }

    function nextYear() {
        if (state.current.getFullYear() + 1 >= maxYear) {
            yearList[state.current.getFullYear()].classList.remove("active");
            yearList[state.current.getFullYear() + 1].classList.add("active");
            state.current.setFullYear(state.current.getFullYear() + 1);
        } else {
            state.current.setFullYear(state.current.getFullYear() + 1);
            state.mode = "year";
            render(state.mode);
        }
    }

    function selectDate(e) {
        state.current.setDate(e.target.innerText);
        render(state.mode);
        fillInput();
        closeCalendar();
    }
    function selectMonth(e) {
        state.current.setMonth(e.target.getAttribute("month-index"))
        state.mode = "date";
        render(state.mode);
    }

    function selectYear(e) {
        state.current.setFullYear(e.target.innerText);
        state.current.setMonth(state.current.getMonth());
        state.mode = "month";
        render(state.mode);
    }

    function switchPanel() {
        if (state.mode == "date") {
            state.mode = "month";
        } else if (state.mode == "month") {
            state.mode = "year";
        }
        render(state.mode)
    }

    function nextAction(e) {
        switch (state.mode) {
            case "date":
                nextDate();
                break;
            case "month":
                nextMonth();
                break;
            case "year":
                nextYear();
                break;
        }

    }

    function prevAction(e) {
        console.log(state.mode);
        switch (state.mode) {
            case "date":
                prevDate();
                break;
            case "month":
                prevMonth();
                break;
            case "year":
                prevYear();
                break;
        }
    }

    function fillInput() {
        let month = state.current.getMonth() < 10 ? "0" + state.current.getMonth() : state.current.getMonth();
        let date = state.current.getDate() < 10 ? "0" + state.current.getDate() : state.current.getDate();
        let fulldate = state.current.getFullYear() + "-" + month + "-" + date;
        document.getElementById("calendarInput").value = fulldate;

    }

    function displayCalendar() {
        container.style.display = "block";
    }

    function closeCalendar() {
        container.style.display = "none";
    }

    function bindingListener() {
        input.addEventListener("focus", displayCalendar);
        year_month.addEventListener("click", switchPanel);
        prev.addEventListener("click", prevAction);
        next.addEventListener("click", nextAction);
    }

    return { init };
}
