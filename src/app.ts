$(function() {
    
    function convert(input: number, conversion: string) {
        var output: number = 0;
        var inputUnit: string = "";
        
        switch (conversion) {
            case "miles":
                output = Math.round((input * 0.621) * 100) / 100;
                inputUnit = "kilometers";
                break;
            case "kilometers":
                output = Math.round((input * 1.609) * 100) / 100;
                inputUnit = "miles";
                break;
            case "meters":
                output = Math.round((input * 0.304) * 100) / 100;
                inputUnit = "feet";
                break;
            case "feet":
                output = Math.round((input * 3.280) * 100) / 100;
                inputUnit = "meters";
                break;
            case "inches":
                output = Math.round((input * 0.393) * 100) / 100;
                inputUnit = "centimeters";
                break;
            case "centimeters":
                output = Math.round((input * 2.540) * 100) / 100;
                inputUnit = "inches";
                break;
            default:
                console.log("Error during conversion");
                break;
        }

        $('#inputUnit').html(inputUnit);
        $('#result').html(output.toString());
        $('#resultUnit').html(conversion);
    }

    function save(input: number, conversion: string, result: number) {
        const timestamp = new Date().getTime();
        const conversionData = {
            input: input,
            conversion: conversion,
            result: result
        };

        localStorage.setItem(timestamp.toString(), JSON.stringify(conversionData));
    }

    function displaySavedConversions() {
        $('.savedList').empty();

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                if (key !== 'conversionData') {
                    let savedData = localStorage.getItem(key);

                    if (savedData !== null) {
                        let conversionData = JSON.parse(savedData);

                        let listItem = $('<div>');
                        switch (conversionData.conversion) {
                            case "miles":
                                listItem.html(`${conversionData.input} kilometers → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                            case "kilometers":
                                listItem.html(`${conversionData.input} miles → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                            case "meters":
                                listItem.html(`${conversionData.input} feet → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                            case "feet":
                                listItem.html(`${conversionData.input} meters → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                            case "inches":
                                listItem.html(`${conversionData.input} centimeters → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                            case "centimeters":
                                listItem.html(`${conversionData.input} inches → ${conversionData.result} ${conversionData.conversion}`);
                                break;
                        }
                        
                        let deleteButton = $('<input type="image" src="assets/delete.png" height="20px" width="20px" class="delete">');
                        deleteButton.data('key', key);

                        deleteButton.on('click', function() {
                            let clickedKey = $(this).data('key');
                            localStorage.removeItem(clickedKey);
                            displaySavedConversions();
                        });

                        listItem.addClass('listItem');
                        listItem.append(deleteButton);
                        $('.savedList').append(listItem);
                    }
                }
            }
        }
    }
    
    displaySavedConversions();

    //Event Handlers
    $('#switchUnit').on('click', function() {
        var input = $('#input');
        var conversion: string = $('#conversionUnit').val() as string;
        var result: string = $('#result').html() as string;

        input.val(result);

        switch (conversion) {
            case "miles":
                conversion = "kilometers";
                break;
            case "kilometers":
                conversion = "miles";
                break;
            case "meters":
                conversion = "feet";
                break;
            case "feet":
                conversion = "meters";
                break;
            case "inches":
                conversion = "centimeters";
                break;
            case "centimeters":
                conversion = "inches";
                break;
        }

        $('#conversionUnit').val(conversion);
        convert(parseFloat(result), conversion);
    });

    $('#input').on('input', function(event) {  
        var inputValue = $(this).val() as string;
        var conversion: string = $('#conversionUnit').val() as string;
        
        var cleanedValue = inputValue.replace(/[^0-9.]/g, '');
    
        if (inputValue !== cleanedValue) {
            alert("Please enter only numbers");
            $(this).val(cleanedValue);
            return;
        } else {
            $(this).val(cleanedValue);
            convert(parseFloat(cleanedValue), conversion);
        }
    });

    $('#conversionUnit').on('change', function() {
        var conversion: string = $('#conversionUnit').val() as string;
        var input = parseFloat($('#input').val() as string);

        convert(input, conversion);
    });

    $('#save').on('click', function() {
        var input = parseFloat($('#input').val() as string);
        var conversion: string = $('#conversionUnit').val() as string;
        var result = parseFloat($('#result').html() as string);

        if (isNaN(input)){
            alert("Please enter a number to save a conversion");
            return;
        }

        save(input, conversion, result);
        displaySavedConversions();
    });
});
