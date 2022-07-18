const tabList = document.querySelector('[role="tablist"]')
const tabs = tabList.querySelectorAll('[role="tab"]')

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabPanel)
})

let tabFocus = 0
function changeTabFocus(e) {
	const keydownLeft = 37
	const keydownRight = 39

	// change the tabindex of the current tab to -1
	if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
		tabs[tabFocus].setAttribute('tabindex', -1)

		// if the right/left key is pushed, move to the next tab on the right/left
		if (e.keyCode === keydownRight) {
			tabFocus = (tabFocus + 1) % tabs.length
		} else if (e.keyCode === keydownLeft) {
			if (tabFocus-- === 0) tabFocus = tabs.length - 1
		}

		tabs[tabFocus].setAttribute('tabindex', 0)
		tabs[tabFocus].focus()
	}
}

function changeTabPanel(e) {
	const targetTab = e.target
	const targetPanel = targetTab.getAttribute('aria-controls')
	const targetImage = targetTab.getAttribute('data-image')

	const tabContainer = targetTab.parentNode
	const mainContainer = tabContainer.parentNode

	// changing the tab underline indicator & focus
	tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false)
	targetTab.setAttribute('aria-selected', true)

	// changing the panel
	hideContent(mainContainer, '[role = "tabpanel"]')
	showContent(mainContainer, `#${targetPanel}`)

	// changing the image
	hideContent(mainContainer, 'picture')
	showContent(mainContainer, `#${targetImage}`)
}

function hideContent(parent, content) {
	parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true))
}

function showContent(parent, content) {
	parent.querySelector(content).removeAttribute('hidden')
}
