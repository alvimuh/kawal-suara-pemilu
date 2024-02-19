export async function getProvinsi() {
  return (await fetch(`/api/district?type=provinsi`)).json();
}

export async function getKabupaten(provinsi: string | null) {
  if (provinsi !== null) {
    const params = new URLSearchParams({
      type: "kabupaten",
      provinsi: provinsi,
    });

    return (await fetch(`/api/district?${params.toString()}`)).json();
  }
  return null;
}

export async function getKecamatan(
  provinsi: string | null,
  kabupaten: string | null
) {
  if (provinsi !== null && kabupaten !== null) {
    const params = new URLSearchParams({
      type: "kecamatan",
      provinsi: provinsi,
      kabupaten: kabupaten,
    });

    return (await fetch(`/api/district?${params.toString()}`)).json();
  }
  return null;
}

export async function getKelurahan(
  provinsi: string | null,
  kabupaten: string | null,
  kecamatan: string | null
) {
  if (provinsi !== null && kabupaten !== null && kecamatan !== null) {
    const params = new URLSearchParams({
      type: "kelurahan",
      provinsi: provinsi,
      kabupaten: kabupaten,
      kecamatan: kecamatan,
    });

    return (await fetch(`/api/district?${params.toString()}`)).json();
  }
  return null;
}

export async function getTps(searchParams: {}) {
  return (await fetch(`/api/tps?${searchParams.toString()}`)).json();
}

export async function getInsight(type: string) {
  return (await fetch(`/api/insight?type=${type}`)).json();
}
