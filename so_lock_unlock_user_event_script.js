//  for this project, first we will create a custom checkbox field to store the lock/unlock status in Netsuie User Interface.
// if the checkbox is true then it is locked and if its flase then it is unlocked
// next, we will create user event script and apply our logic in view mode pt to add lock/unlock button on the sales order using beforeload function
// and after that we will assign  custom checkbox filed  to a variable 
// then we will use that variable with an if statement to check the lock status and if the sales order is locked we will remove the standard edit button
// then , we will create client script to define the function logic of lock/unlock button actions and upload this script to the file cabinet in netsuite to get the file id.
// then, we will link  clinet script with the user event script by using form.
// this setup will allow button to appear on the sales order form and client script will handle the lock unlock actions


/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(["N/ui/serverWidget", "N/record"], function(ui, record){

    function beforeLoad(context){

        //  use try-catch block to prevent script from crashing and to log any error.

        try{
                       
            // cutomize button can be only added in view mode.
            if (context.type === context.UserEventType.VIEW){

                var salesOrder = context.newRecord;
                var form = context.form;
                var isLocked = salesOrder.getValue({fieldId: "custbody_lock_flag"})
                // we created a custom checkbox field called custbody_lock_flag to track the lock/unlock status and to store its value.
                // assign the value of custom checkbox field to islocked, true = locked, false = unlocked
                
                if(isLocked){
                    // Adding Unlock button
                    form.addButton({
                        id: "custpage_unlock_button",
                        label: "Unlock",
                        functionName: "unlocSaleskOrder" // function will be defined in client script
                    });
                    form.removeButton("edit"); // Prevent editing while locked

                }
                else{

                    // Adding lock button
                     form.addButton({
                        id: "custpage_lock_button",
                        label: "Lock",
                        functionName: "lockSalesOrder"// we will define the logic in client script
                    });  
                
                }
                
                //client scipt will be linked to handle button click logic
                form.clientScriptFileId = "Assigned client script id";
                 // After deploing the client Script, NetSuite will automatically assign the file id

            }
        }
        catch(e){
            log.error("error in beforeLoad", e.toString());
            // e.toString() converts the error into a readable message
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});



