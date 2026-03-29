// ==============================
// TABLE SELECTION
// ==============================

function initObTableSelection(tableId, selectAllId, rowClass) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const selectAll = table.querySelector(`#${selectAllId}`);
    const rowChecks = table.querySelectorAll(`.${rowClass}`);

    if (!selectAll || rowChecks.length === 0) return;

    // Header → Rows
    selectAll.addEventListener("change", function () {
        rowChecks.forEach(cb => {
            cb.checked = this.checked;

            const row = cb.closest(".ob-tr");
            if (row) row.classList.toggle("selected", this.checked);
        });
    });

    // Rows → Header
    rowChecks.forEach(cb => {
        cb.addEventListener("change", function () {
            const row = this.closest(".ob-tr");
            if (row) row.classList.toggle("selected", this.checked);

            const allChecked = [...rowChecks].every(c => c.checked);
            const someChecked = [...rowChecks].some(c => c.checked);

            selectAll.checked = allChecked;
            selectAll.indeterminate = !allChecked && someChecked;
        });
    });
}


// ==============================
// EDIT MODE (SHOW/HIDE CHECKBOX)
// ==============================

function initObTableEditMode(tableId, editBtnId, rowClass, selectAllId) {
    const table = document.getElementById(tableId);
    const editBtn = document.getElementById(editBtnId);

    if (!table || !editBtn) return;

    editBtn.addEventListener("click", () => {
        table.classList.toggle("ob-table-select-mode");

        const isActive = table.classList.contains("ob-table-select-mode");

        // Toggle button text
        editBtn.textContent = isActive ? "Done" : "Select";

        // Reset selection when exiting edit mode
        if (!isActive) {
            const rowChecks = table.querySelectorAll(`.${rowClass}`);
            const selectAll = table.querySelector(`#${selectAllId}`);

            rowChecks.forEach(cb => {
                cb.checked = false;

                const row = cb.closest(".ob-tr");
                if (row) row.classList.remove("selected");
            });

            if (selectAll) {
                selectAll.checked = false;
                selectAll.indeterminate = false;
            }
        }
    });
}


// ==============================
// ENABLE / DISABLE ACTION BUTTONS
// ==============================

function initObSimpleActionToggle(tableId, rowClass, editBtnId, deleteBtnId, selectAllId) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const checkboxes = table.querySelectorAll(`.${rowClass}`);
    const editBtn = document.getElementById(editBtnId);
    const deleteBtn = document.getElementById(deleteBtnId);
    const selectAll = table.querySelector(`#${selectAllId}`);

    if (!checkboxes.length || !editBtn || !deleteBtn) return;

    function updateState() {
        const anyChecked = [...checkboxes].some(cb => cb.checked);

        editBtn.disabled = !anyChecked;
        deleteBtn.disabled = !anyChecked;
    }

    // Row checkboxes
    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateState);
    });

    // Select-all checkbox
    if (selectAll) {
        selectAll.addEventListener("change", updateState);
    }
}


// ==============================
// INIT (SAFE)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    initObTableSelection("ob-table-1", "ob-select-all-1", "ob-row-check-1");

    initObTableEditMode(
        "ob-table-1",
        "ob-edit-btn-1",
        "ob-row-check-1",
        "ob-select-all-1"
    );

    initObSimpleActionToggle(
        "ob-table-1",
        "ob-row-check-1",
        "ob-edit-action-1",
        "ob-delete-action-1",
        "ob-select-all-1"
    );
});