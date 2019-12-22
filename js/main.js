window.onload = function () {
    //set the current date when loading the page
    startDate();
};

//Set data for SUM Range
const SUM = {
    min: 50,
    mid: 15000,
    max: 30000,
    sum: document.querySelector('#sum'),
    sum_value: document.querySelector('.sum_value')
};


//Set data for TIME Range
const TIME = {
    days: {
        start: 1,
        end: 30,
        name: 'дней'
    },
    weeks: {
        start: 1,
        end: 18,
        name: 'нд'
    },
    time: document.querySelector('#time'),
    time_value: document.querySelector('#time_value'),
    time_name: document.querySelector('#time_name')
};

//Information table with animation
const MORE = document.querySelector('.flip-container');

//loan amount to the button
const totalSumBtn = document.getElementsByClassName('send-request__amount');

//Flag when changing transition dates or sums
let isMore = false;


SUM.sum.addEventListener('input', function () {
    //set color input when value changes
    let inRange = $(this);
    let rangeColor = document.getElementsByClassName('range-of-term');

    styleRange(inRange);
    //

    //Outer
    SUM.sum_value.innerText = this.value;

    $('.sum_value').text(this.value);

    //Regular callback when changing value
    if (this.value < SUM.mid) {
        //Change time date name (day)
        TIME.time_name.innerText = TIME.days.name;

        //Total outer
        $('.total-pay-day').text(this.value + ".70");
        $(totalSumBtn).text(parseFloat((this.value + ".70")).toFixed(2));

    } else {
        //Change time date name (week)
        TIME.time_name.innerText = TIME.weeks.name;

        //Total outer
        $('.total-pay-week').text((this.value / 5 + 0.70).toFixed(2));
        $(totalSumBtn).text(''); //Clear result on button
    }
    //


    // if more than 15000
    if (this.value >= SUM.mid && !isMore) {
        TIME.time.setAttribute('min', TIME.weeks.start);//Change attr for input TIME
        TIME.time.setAttribute('max', (TIME.weeks.end * 2 - 1));//Change attr for input TIME
        TIME.time.value = TIME.weeks.end;
        TIME.time_value.innerText = TIME.time.value - (TIME.weeks.end - 1); //Set start week val

        //to activate the animation

        isMore = true;

        if (isMore) {
            inRange[0].classList.add('active-week');//Change input thumb color

            MORE.classList.add("active");//Flip animation

            $('.mobile-show__txt').fadeIn(300);// Show on mobile text description

            $(rangeColor).css({
                width: 50 + '%' //color input alignment
            });
        }

    }

    // if less than 15000
    if (this.value < SUM.mid && isMore) {
        TIME.time.setAttribute('min', TIME.days.start);
        TIME.time.setAttribute('max', (TIME.days.end * 2 - 1));
        TIME.time.value = TIME.days.end;
        TIME.time_value.innerText = TIME.time.value;
        isMore = false;

        if (!isMore) {
            inRange[0].classList.remove('active-week');
            MORE.classList.remove("active");

            $('.mobile-show__txt').fadeOut(300);
            $(rangeColor).css({
                width: 50 + '%'
            });
        }
    }


});

let timeDay, timeWeek; //for Date

TIME.time.addEventListener('input', function () {
    //set color input when value changes
    let inRange = $(this);
    let rangeColor = document.getElementsByClassName('range-of-sum');

    styleRangeTerm(inRange);
    //

    //start and change Date
    timeWeek = $('#time').val();

    startDate(timeWeek);
    //

    //Regular callback when changing value
    if (SUM.sum.value < SUM.mid) {
        TIME.time_value.innerText = this.value;
        TIME.time_name.innerText = TIME.days.name;
    } else {
        TIME.time_value.innerText = this.value - (TIME.weeks.end - 1);
        TIME.time_name.innerText = TIME.weeks.name;
        $(totalSumBtn).text('');
    }

    //if more than 30 days
    if (this.value >= TIME.days.end && !isMore) {
        SUM.sum.value = SUM.mid;
        SUM.sum_value.innerText = SUM.mid;
        this.setAttribute('min', TIME.weeks.start);
        this.setAttribute('max', (TIME.weeks.end * 2 - 1));
        this.value = TIME.weeks.end;
        isMore = true;

        if (isMore) {
            MORE.classList.add("active");
            inRange[0].classList.add('active-week');

            $('.mobile-show__txt').fadeIn(300);
        }
        $(rangeColor).css({width: 50 + '%'});

    }

    //if less than 30 days
    if (this.value - (TIME.weeks.end - 1) < TIME.weeks.start && isMore) {
        SUM.sum.value = SUM.mid - 1;
        SUM.sum_value.innerText = SUM.mid - 1;
        this.setAttribute('min', TIME.days.start);
        this.setAttribute('max', (TIME.days.end * 2 - 1));
        this.value = TIME.days.end;
        isMore = false;

        if (!isMore) {
            MORE.classList.remove("active");
            inRange[0].classList.remove('active-week');
            $('.mobile-show__txt').fadeOut(300);

            timeDay = this.value;
        }
        $(rangeColor).css({width: 50 + '%'});
    }


});

//Date display
function startDate(val) {

    let dateDay = moment();
    let dateMonth = moment();
    dateDay.add(val, 'day');// add Days changes
    dateMonth.add(val * 7, 'day');//add Week changes

    $('.date-day').text(dateDay.format('DD MM YYYY'));// Format to display
    $('.date-week').text(dateMonth.format('DD MM YYYY'));

}
//

//gradient for input SUM
function styleRange(slider) {
    let sum = Math.round($(slider).val() / 299).toFixed(0); // for correct display
    let rangeColor = document.getElementsByClassName('range-of-sum');

    $(rangeColor).css({
        width: sum + '%'
    });
}

//gradient for input TIME
function styleRangeTerm(slider) {
    let sum = Math.round($(slider).val()).toFixed(0);// for correct display

    //if Week
    if ($(slider).hasClass('active-week')) {

        sum *= 2.8; // for correct display on WEEK

        let rangeColor = document.getElementsByClassName('range-of-term');

        $(rangeColor).css({
            width: sum + '%'
        });

        $('.ZOPA').fadeIn(200);

    } else { // Day

        sum *= 1.6; // for correct display on DAY

        let rangeColor = document.getElementsByClassName('range-of-term');

        $(rangeColor).css({
            width: sum + '%'
        });
    }
}
