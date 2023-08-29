
function generateLayout(seats, zIndex, n) {
    var busLayoutHtmlTmpl = '';
    var maxNoOfColumns = 0;
    var missingPathWayRowNO = -1;
    var missingPathWayRowNOTmp = 0
    var isfirtRow = 0;
    var isDriverSeat = true;
    var rowSeatValues = [];
    var columnSeatValues = [];
    _.each(seats, function (columnSeats, rowIndex) {
        if (isfirtRow == 0) {
            missingPathWayRowNOTmp = rowIndex;
            isfirtRow = 1;
        } else {
            if (parseInt(missingPathWayRowNOTmp) + 1 != rowIndex) {
                missingPathWayRowNO = parseInt(missingPathWayRowNOTmp) + 1;
            } else {
                missingPathWayRowNOTmp = parseInt(missingPathWayRowNOTmp) + 1;
                maxNoOfColumns = columnSeats.length > maxNoOfColumns ? columnSeats.length : maxNoOfColumns;
            }
        }

    });
    var v = [];
    _.each(zIndex, function (seats, t) {
        $.inArray(seats, v) === -1 && v.push(seats)
    }),
        _.each(seats, function (columnSeats, rowIndex) {
            _.each(columnSeats, function (seat, columnIndex) {
                if ($.inArray(seat.row, rowSeatValues) === -1) {
                    rowSeatValues.push(seat.row);
                }
                if ($.inArray(seat.column, columnSeatValues) === -1) {
                    columnSeatValues.push(seat.column);
                }
            });
        });
    var seatLayOutMax = new Array();
    var count = 0;
    _.each(rowSeatValues, function (row, columnIndex) {
        seatLayOutMax[row] = new Array();
        _.each(columnSeatValues, function (seat, columnIndex) {
            seatLayOutMax[row][seat] = "";
        });
    });
    _.each(seats, function (columnSeats, rowIndex) {
        _.each(columnSeats, function (seat, columnIndex) {
            seatLayOutMax[seat.row][seat.column] = seat
        });
    });
    var pathComparision = 0; var enterInRowsCount = 0;
    _.each(seatLayOutMax, function (seats, index) {
        busLayoutHtmlTmpl += '<tr>';
        if (zIndex == 0 && isDriverSeat) {
            isDriverSeat = false;
        }
        isDriverSeat = false;
        _.each(seats, function (col, ind) {
            var seat = col;
            if (seat == undefined) { return; }
            pathComparision = seat.row;
            if (seat != "") {
                var l = seat.length;
                var w = seat.width;
                if (l == 1 && w == 1) {
                    busLayoutHtmlTmpl += '<td data-toggle="tooltip" title="Seat : ' + seat.id + ' | Fare : ' + getAgentMarkup(seat.fare, n) + '" style="width:8%; padding:2px;"><div id="div' + (seat.id + "_" + n) + '" style="cursor:pointer" onclick="seatMapClicked(\'div' + (seat.id + "_" + n) + '\',\'' + seat.fare + '\',\'../../Assets/SVGs/CC' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png\',\'' + seat.available + '\',\'' + seat.length + '\',\'' + n + '\',\'' + seat.id + '\',\'' + seat.totalFareWithTaxes + '\',\'' + seat.serviceTaxAmount + '\',\'' + seat.operatorServiceChargeAbsolute + '\',' + seat.ladiesSeat + ',' + seat.ac + ',' + seat.sleeper + ')"><img  style="width: 25px;" src="../../Assets/SVGs/CC' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png" class="imgCC" id="imgCC"></div></td>';
                } else if (l == 1 && w == 2) {
                    busLayoutHtmlTmpl += '<td data-toggle="tooltip" title="Seat : ' + seat.id + ' | Fare : ' + getAgentMarkup(seat.fare, n) + '"  style="width:8%; padding:2px;"><div id="div' + (seat.id + "_" + n) + '" style="cursor:pointer" onclick="seatMapClicked(\'div' + (seat.id + "_" + n) + '\',\'' + seat.fare + '\',\'../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png\',\'' + seat.available + '\',\'2\',\'' + n + '\',\'' + seat.id + '\',\'' + seat.totalFareWithTaxes + '\',\'' + seat.serviceTaxAmount + '\',\'' + seat.operatorServiceChargeAbsolute + '\',' + seat.ladiesSeat + ',' + seat.ac + ',' + seat.sleeper + ')"><img style="width: 40px;transform: rotate(90deg);margin-top: 15px;" src="../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png" class="imgSleeper" id="imgSleeper"></div></td>';
                } else if (l == 2 && w == 1) {
                    if (rowSeatValues.length == 1) {
                        busLayoutHtmlTmpl += '<td data-toggle="tooltip" title="Seat : ' + seat.id + ' | Fare : ' + getAgentMarkup(seat.fare, n) + '"  style="width:8%; padding:2px;" rowspan="2"><div id="div' + (seat.id + "_" + n) + '" style="cursor:pointer"  onclick="seatMapClicked(\'div' + (seat.id + "_" + n) + '\',\'' + seat.fare + '\',\'../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png\',\'' + seat.available + '\',\'' + seat.length + '\',\'' + n + '\',\'' + seat.id + '\',\'' + seat.totalFareWithTaxes + '\',\'' + seat.serviceTaxAmount + '\',\'' + seat.operatorServiceChargeAbsolute + '\',' + seat.ladiesSeat + ',' + seat.ac + ',' + seat.sleeper + ')"><img style="width: 40px;transform: rotate(90deg);margin-top: 15px;" src="../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png" class="imgSleeper" id="imgSleeper"></div></td>';
                    } else {
                        busLayoutHtmlTmpl += '<td data-toggle="tooltip" title="Seat : ' + seat.id + ' | Fare : ' + getAgentMarkup(seat.fare, n) + '"  style="width:8%; padding:2px;"><div id="div' + (seat.id + "_" + n) + '" style="cursor:pointer"  onclick="seatMapClicked(\'div' + (seat.id + "_" + n) + '\',\'' + seat.fare + '\',\'../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png\',\'' + seat.available + '\',\'' + seat.length + '\',\'' + n + '\',\'' + seat.id + '\',\'' + seat.totalFareWithTaxes + '\',\'' + seat.serviceTaxAmount + '\',\'' + seat.operatorServiceChargeAbsolute + '\',' + seat.ladiesSeat + ',' + seat.ac + ',' + seat.sleeper + ')"><img style="width: 40px;" src="../../Assets/SVGs/Sleeper' + (seat.available === true ? (seat.ladiesSeat === true ? "Ladies" : "") : "Booked") + '.png" class="imgSleeper" id="imgSleeper"></div></td>';
                    }
                }
            } else {
                busLayoutHtmlTmpl += '<td></td>';
            }
        });
        busLayoutHtmlTmpl = busLayoutHtmlTmpl.replace('<tr></tr>', '');
        if (seats == undefined && busLayoutHtmlTmpl != "<tr>" && !busLayoutHtmlTmpl.includes('<tr><td><div style="width: 28px; height: 24px; margin-right: 5px;"></div></td><td></td></tr>')) {
            busLayoutHtmlTmpl.replace('<tr></tr>', '');
            busLayoutHtmlTmpl += '<tr><td><div style="width: 28px; height: 24px; margin-right: 5px;"></div></td><td></td></tr>';
        } else {
            busLayoutHtmlTmpl += '</tr>';
        }
    });
    isDriverSeat = false;
    return busLayoutHtmlTmpl;
}