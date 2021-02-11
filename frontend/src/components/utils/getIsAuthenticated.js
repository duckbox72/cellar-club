export function getIsAuthenticated() {

    fetch("/api/is_authenticated")
        .then(response => response.json())
        .then(data => {
            const isAuthenticated = data.is_authenticated;
            return isAuthenticated;
        });
}
