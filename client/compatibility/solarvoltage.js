function solarvoltage() {
  var seriesData = []
  var latest8 = isssolar.find({type: '2Avoltage'},{sort: {time : -1}, limit: 8}).fetch();
  latest8.forEach(function (item) {
    seriesData.push(item.time, Number(item.value));
  });

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  $('#solarvoltagechart').highcharts({
    chart: {
      type: 'spline',
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var last_solar = series.data[series.data.length - 1];
            var solar = isssolar.findOne({type: '2Avoltage'},{sort: {time : -1}});
            if ( Number(last_solar.y) != Number(solar.value) ) {
              var x = (new Date()).getTime(); // current time
              var y = Number(solar.value);
              series.addPoint([x, y], true, true);
            }
          }, 3000);
        }
      }
    },
    title: {
      text: 'Voltage of Solar panel 2A - Live data'
    },
    xAxis: {
      type: 'datetime',
      tickAmount: 5
    },
    yAxis: {
      title: {
        type: 'logarithmic',
        text: 'Value',
        tickAmount: 5
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    series: [{
      name: '2A Voltage',
      data: seriesData
    }]
  });
}