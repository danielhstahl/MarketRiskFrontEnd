//this class creates the modal and provides utility classes to change various aspects of the modal.
function loadModal(){
    this.self={};
    this.interior={};
    this.oldInterior={};
    this.footer={};
    this.oldFooter={};
    this.launch=function(title, buttonText, clickEvent){
        var modal=AuditApp.holdDataModal({Title:title, clickEvent:clickEvent, buttonText:buttonText});
        self=$($(modal)[2]);
        self.modal('show');
        self.on('hidden.bs.modal', function(){ 
            self.remove(); 
        });
        interior=self.find('.container-fluid');
        footer=self.find('.modal-footer');
    }
    this.replaceInterior=function(html){
        oldInterior=interior.html();
        interior.html(html);//replaces what was inside    
    }
    this.replaceFooter=function(html){
        oldFooter=footer.html();
        footer.html(html);//replaces what was inside    
    }
    this.undoFooter=function(html){ //undoes the previous action 
        var p=footer.html();
        footer.html(oldFooter);
        oldFooter=p;
    }
    this.appendInterior=function(html){
        oldInterior=interior.html();
        interior.html(interior.html()+html);//appends to what was inside   
    }   
    this.prependInterior=function(html){
        oldInterior=interior.html();
        interior.html(html+interior.html());//appends to what was inside   
    }     
    this.undoInterior=function(){
        var p=interior.html();
        interior.html(oldInterior);
        oldInterior=p;
    }
}