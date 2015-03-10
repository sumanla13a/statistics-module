'use strict';

var stat = {
    sum: function(array) {
        return array.reduce(function(a,b) {
            return a + b;
        });
    },

    min: function(array) {
        var minimum = array[0];
        array.forEach(function(entry) {
            if(minimum > entry) minimum = entry;
        });
        return minimum;
    },

    max: function(array) {
        var maximum = 0;
        array.forEach(function(entry) {
            if(maximum < entry) maximum = entry;
        });
        return maximum;
    },

    product: function(array) {
        return array.reduce(function(a,b) {
            return a*b;
        });
    },

    mean: function (array) {
        return array.length > 0 ? this.sum(array)/array.length : false;
    },

    geometricMean: function(array) {
        return array.length > 0 ? Math.pow(this.product(array), 1/array.length) : false;
    },

    harmonicMean: function(array) {
        var inverseSum = array.reduce(function(a, b) {
            return 1/a + 1/b;
        });
        return array.length > 0 ? array.length/(inverseSum) : false;
    },

    median: function(array) {
        array.sort(compareAsc);
        if(array.length%2 !== 0)
            return array[Math.ceil(array.length/2)];
        else
            return (array[array.length/2] + array[array.length/2 + 1])/2;
    },

    mode: function(array) {
        var unique = countUnique(array);
        var max = 0;
        var modes = [];
        Object.keys(unique).forEach(function(entry) {
            max = unique[entry] > max ? unique[entry] : max;
        });
        Object.keys(unique).forEach(function(entry) {
            if(unique[entry] === max) modes.push(entry);
        });
        return modes;
    },

    variance: function(array) {
        var mean = this.mean(array);
        if(mean)
            array.map(function(a) {
                return Math.pow((a-mean),2);
            });
        else
            return false;

        return this.mean(array);
    },

    standardDeviation: function(array) {
        return Math.sqrt(stat.variance(array));
    },

    meanAbsoluteDeviation: function(array) {
        var mean = this.mean(array);
        if(mean)
            array.map(function(a) {
                return Math.abs(a-mean);
            });
        else
            return false;
        return this.mean(array);
    },

    medianAbsoluteDeviation: function(array) {
        var median = this.median(array);
        array.map(function(a) {
            return Math.abs(a-median);
        });
        return this.median(array);
    },

    quantile: function(array, order) {
        array.sort(compareAsc);
        order = typeof order === 'undefined' ? 4 : order; //making it a quartile if order is not passed
        var quantiles = [];
        var factor = array.length/order;
        for(var i = 1; i<order; ++i) {      //first and last quantile is not shown as they are not universally accepted
            if(factor*i % 1 !== 0)          //i.e the result is not an ingeger, so the rounded index will be its corresponding quartile
                quantiles.push(array[Math.round(factor*i)-1]);
            else                            //i.e the result is an integer and the corresponding quartile is calculated with its index and next element
                quantiles.push((array[factor*i-1] + array[factor*i])/2);
        }
        return quantiles;
    }
};

function countUnique(array) {
    var countUniqueObj = {};
    array.forEach(function(entry) {
        countUniqueObj[entry] = ++countUniqueObj[entry] || 1;
    });
    return countUniqueObj;
}

function roundedDivision(length, number) {
    return Math.round(length/number);
}

function compareAsc(a, b) {
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
}

module.exports = stat;


/*--------------------------------------Test Codes-------------------------------------------------*/

if(require.main === module) {
    var array = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
    var array1 = [1,2,3,4,5,6,7,8];
    var array2 = [1,2,3,4,5,6,7,8,9];
    console.log('For array ' + array + ' we get: ')
    for(var keys in stat) {
        console.log(stat[keys](array) + ' for array as ' + keys);
    }
}