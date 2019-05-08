function renderChart() {
    var coords = []
    var data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
    var labels =  [1, 2, 3, 4, -1, -2, -5];
    var ctx = document.getElementById("myChart").getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: ["Label 1", "Label 2", "Label 3"],
            datasets: [{
                label: 'Legend',
                data: [{
                    x: -10,
                    y: 0,
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }]
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                    var label = data.labels[tooltipItem.index];
                    return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                    }
                }
            }
        }
    });
}

//
