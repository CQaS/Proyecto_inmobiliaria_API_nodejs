// js/fetchUtils.js
export const loadHTML = async (url, containerId) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Response error: ' + response.statusText)
        }
        const data = await response.text()
        document.getElementById(containerId).innerHTML = data
    } catch (error) {
        console.error('Fetch error:', error)
    }
}