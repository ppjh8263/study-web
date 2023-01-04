var Theme = {
    set_all_value:function(cls_name,color){
        document.querySelectorAll(
                cls_name).forEach(target => target.value = color
                );
    },
    set_class:function(target, new_class){
        target.className = new_class;
    },
    change_theme: function(){
        var target = document.querySelector('body');
        if(target.className === 'white'){
            Theme.set_class(target, 'black');
            Theme.set_all_value('.theme_chagne','white')
        } else if(target.className === 'black'){
            Theme.set_class(target, 'white');
            Theme.set_all_value('.theme_chagne','black')
        }
    }

}