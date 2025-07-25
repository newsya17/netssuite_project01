/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */

define(["N/currentRecord","N/record"], function(currentRecord, record){

    function lockSalesOrder(){
        var rec = currentRecord.get();

        // we use submitfield api because it updates the record in NetSuite based on lock/unlock button logic.
        record.submitFields({
            type: record.Type.SALES_ORDER,
            id: rec.id,
            values: {custbody_lock_flag: true}
        })
        alert("Sales order has been locked");
        location.reload(); // it refreshes the page so user sees the updated status immediately
    }

    function unlockSalesOrder(){
        var rec= currentRecord.get();
        // we use submitfield api because it updates the record in NetSuite based on lock/unlock button logic.
        record.submitFields({
            type: record.Type.SALES_ORDER,
            id: rec.id,
            values: {custbody_lock_flag: false}
        })
        alert("Sales order has been unlocked");
        location.reload(); // it refreshes the page so user sees the updated status immediately
    }

    return {
        lockSalesOrder: lockSalesOrder,
        unlockSalesOrder: unlockSalesOrder
    };


});
