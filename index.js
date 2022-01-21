
let extensions_list_node = document.getElementById('extensions-list')
chrome.management.getAll(function (extensions) {
    var extensionList = [];
    //get only extensions
    for (var i = 0; i < extensions.length; i++) {
        if (!extensions[i].isApp) {
            extensionList.push(extensions[i]);
        }
    }
    //sort by name
    extensionList.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    //create list
    console.log(extensionList);
    extensionList.forEach(extension => {

        let extension_node = document.createElement('div')
        extension_node.classList.add('extension')
        let logo_container = document.createElement('div')
        logo_container.classList.add('extension-logo-container')
        let logo_img = document.createElement('img')
        logo_img.style.width = '20px'
        logo_img.style.height = '20px'
        if (extension.icons === undefined) {
            logo_img.src = "../Assets/icons/duckduckgo.svg"

        }
        else {
            console.log(extension.icons)
            logo_img.src = extension.icons[0].url
        }
        logo_container.appendChild(logo_img)
        extension_node.appendChild(logo_container)
        let extension_name_container = document.createElement('div')
        extension_name_container.classList.add('extension-name')
        let extension_name = document.createElement('span')
        extension_name.innerText = extension.name
        extension_name_container.appendChild(extension_name)
        extension_node.appendChild(extension_name_container)
        let extension_switch_container = document.createElement('div')

        let label_node = document.createElement('label')
        label_node.classList.add('switch')
        let input_node = document.createElement('input')
        input_node.type = 'checkbox'
        input_node.checked = extension.enabled
        label_node.appendChild(input_node)
        let round_span_node = document.createElement('span')
        round_span_node.classList.add('slider')
        round_span_node.classList.add('round')
        label_node.appendChild(round_span_node)
        extension_switch_container.appendChild(label_node)
        extension_node.appendChild(extension_switch_container)
        extensions_list_node.appendChild(extension_node)
        input_node.addEventListener('change', function () {
            if (input_node.checked) {
                chrome.management.setEnabled(extension.id, true, () => location.reload())
            } else {
                chrome.management.setEnabled(extension.id, false, () => location.reload())
            }
        })
       
    })
})