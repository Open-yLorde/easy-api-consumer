export async function getDeviceIpAddress(): Promise<string> {
    const res = await fetch("https://api.ipify.org/?format=json", {
        method: "GET"
    });

    if (res.status != 200) {
        return "::1";
    };

    const { ip } = await res.json();
    return ip;
};