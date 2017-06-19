function isEmpty(arr) {
    return !(arr.length >= 1);
};

function loadConfig( callback ) {
    $.ajax({
        url: '../common/data.json',
        dataType: 'json',
        success: function (config) {
            callback( config );
        }
    });
};