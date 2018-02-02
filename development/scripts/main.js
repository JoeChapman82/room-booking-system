if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function isTodayOrTheFuture(date) {
  return differenceInDays(date, new Date()) >= 0;
}

function isOverTwoMonths(date) {
    return differenceInDays(date, new Date()) >= 60;
}

var isClicking = false;
document.querySelectorAll('#input-date-day, #input-date-month, #input-date-year').forEach(function(input) {
    input.addEventListener('blur', function() {
        this.parentNode.parentNode.parentNode.parentNode.parentNode.submit();
    });
});

document.querySelectorAll('.time').forEach(function(time) {
    time.addEventListener('mousedown', function(e) {
    e.preventDefault();
    document.querySelectorAll('.time').forEach(function(innerTime) {
        innerTime.classList.remove('provisional-date');
    });
        this.classList.toggle('provisional-date');
        isClicking = true;
    });
    time.addEventListener('mouseup', function() {
        isClicking = false;
        var selectedDates = document.querySelectorAll('.provisional-date');
        var firstSelectedDate = selectedDates[0].getAttribute('data-time').split(':');
        var lastSelectedDate = selectedDates.length === 1 ? selectedDates[0].getAttribute('data-time').split(':') : selectedDates[selectedDates.length - 1].getAttribute('data-time').split(':');
        var inputs = document.querySelectorAll('#hours, #minutes');
        inputs[0].value = firstSelectedDate[0].length === 1 ? '0' + firstSelectedDate[0] : firstSelectedDate[0];
        inputs[1].value = firstSelectedDate[1];
        var toHours = lastSelectedDate[1] === '30' ? pad(parseInt(lastSelectedDate[0]) + 1).toString() : lastSelectedDate[0];
        inputs[2].value = toHours.length === 1 ? '0' + toHours : toHours;
        inputs[3].value = lastSelectedDate[1] === '30' ? '00' : '30';
        console.log(inputs[0].value, inputs[1].value,inputs[2].value,inputs[3].value);
    });
    time.addEventListener('mouseover', function() {
        if(isClicking === true) {
        this.classList.add('provisional-date');
        }
    });

});

document.querySelectorAll('.date-picker-input').forEach(function(input) {
    input.addEventListener('blur', reloadOnDateChange);
});

function reloadOnDateChange() {
    if(this.value !== this.dataset.original) {
        document.getElementById('changeDate').click();
    }
}

document.querySelectorAll('.select-room-to-edit-button').forEach(function(button) {
    button.addEventListener('click', updateEditableRoomFields);
});

function updateEditableRoomFields() {
    document.getElementById('roomId').value = this.dataset.id;
    document.getElementById('name').value = this.dataset.name;
    document.getElementById('sitting').value = this.dataset.sitting;
    document.getElementById('standing').value = this.dataset.standing;
    var equipment = document.querySelectorAll('#equipment');
    if(equipment[0]) {
        equipment[0].value = this.dataset.equipment1 || '';
    }
    if(equipment[1]) {
        equipment[1].value = this.dataset.equipment2 || '';
    }
}
