$(function() {
    $('#name').submit(function(){
        $('#name').find('#type').val($("#classes").find('.active').attr('id'));
        return true;
    });
});