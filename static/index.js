var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()

$(document).ready(function () {
    $("#display_date").html(display_date)
    $('#save_button').prop('disabled', true);
})

let predicted_emotion;
$(function () {
    $("#predict_button").click(function () {
        let input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {
                $("#prediction").html(result.data.predicted_emotion)
                $("#emo_img_url").attr('src', result.data.predicted_emotion_img_url);
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");
                predicted_emotion = result.data.predicted_emotion
                $('#save_button').prop('disabled', false);
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });


//     In the index.js file write the AJAX call to save the entry. 
//     The steps are as follows: 
//     1. Entry is saved when the Save This Entry button is clicked. 
//        So write using the click() method of jQuery. 
//     2. As soon as this button is clicked, the date, text and emotions are saved in the 
//        save_data variable.
//     3. Now create an AJAX call. Define the type of request sent, url of the API. 
//     4. This call will send the data in JSON format. 
//     5. On successful saving of entry, the window is reloaded for entering the text again. 
//     6. If any error occurs, an error message will be displayed.

    $("#save_button").click(function () {
        save_data = {
            "date": display_date,
            "text": $("#text").val(),
            "emotion": predicted_emotion
        }
        $.ajax({
            type: 'POST',
            url: "/save-entry",
            data: JSON.stringify(save_data),
            dataType: "json",
            contentType: 'application/json',
            success: function () {
                alert("Your entry has been saved successfully!")
                window.location.reload()
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });

    });
})

