// ==========================
// DATA GEJALA
// ==========================
const gejala = [
    { kode: "G01", nama: "Mesin tidak hidup" },
    { kode: "G02", nama: "Starter tidak berfungsi" },
    { kode: "G03", nama: "Lampu redup" },
    { kode: "G04", nama: "Mesin mati tiba-tiba" },
    { kode: "G05", nama: "Bunyi kasar pada mesin" },
    { kode: "G06", nama: "Tarikan mesin lemah" },
    { kode: "G07", nama: "Mesin cepat panas" },
    { kode: "G08", nama: "Asap knalpot hitam" },
    { kode: "G09", nama: "Rem tidak pakem" },
    { kode: "G10", nama: "Suara berisik pada rantai" },
    { kode: "G11", nama: "Mesin brebet" },
    { kode: "G12", nama: "Kelistrikan mati total" },
    { kode: "G13", nama: "Bensin tidak mengalir" },
    { kode: "G14", nama: "Indikator check engine menyala" },
    { kode: "G15", nama: "Sensor tidak terbaca" }
];

// ==========================
// DATA KERUSAKAN
// ==========================
const kerusakan = [
    { kode: "K01", nama: "Aki rusak" },
    { kode: "K02", nama: "Dinamo starter rusak" },
    { kode: "K03", nama: "Busi bermasalah" },
    { kode: "K04", nama: "Alternator rusak" },
    { kode: "K05", nama: "Filter udara kotor" },
    { kode: "K06", nama: "Karburator/injektor kotor" },
    { kode: "K07", nama: "Radiator bermasalah" },
    { kode: "K08", nama: "Oli mesin habis/kotor" },
    { kode: "K09", nama: "Kampas rem aus" },
    { kode: "K10", nama: "Rantai atau belt longgar" },
    { kode: "K11", nama: "Koil pengapian rusak" },
    { kode: "K12", nama: "Sekring putus" },
    { kode: "K13", nama: "Pompa bahan bakar rusak" },
    { kode: "K14", nama: "ECU bermasalah" },
    { kode: "K15", nama: "Sensor mesin rusak" }
];

// ==========================
// ATURAN (IF-THEN)
// ==========================
const aturan = [
    { kerusakan: "K01", gejala: ["G01", "G03"] }, // aki
    { kerusakan: "K02", gejala: ["G01", "G02"] }, // starter
    { kerusakan: "K03", gejala: ["G04", "G11"] }, // busi
    { kerusakan: "K04", gejala: ["G03", "G04"] }, // alternator
    { kerusakan: "K05", gejala: ["G06", "G08"] }, // filter udara
    { kerusakan: "K06", gejala: ["G11", "G06"] }, // injektor
    { kerusakan: "K07", gejala: ["G07", "G04"] }, // radiator
    { kerusakan: "K08", gejala: ["G05", "G07"] }, // oli
    { kerusakan: "K09", gejala: ["G09"] },        // rem
    { kerusakan: "K10", gejala: ["G10"] },        // rantai
    { kerusakan: "K11", gejala: ["G01", "G11"] }, // koil
    { kerusakan: "K12", gejala: ["G12"] },        // sekring
    { kerusakan: "K13", gejala: ["G01", "G13"] }, // pompa bensin
    { kerusakan: "K14", gejala: ["G14", "G04"] }, // ECU
    { kerusakan: "K15", gejala: ["G15", "G14"] }  // sensor
];

// ==========================
// TAMPILKAN GEJALA
// ==========================
const listGejala = document.getElementById("listGejala");

gejala.forEach(g => {
    listGejala.innerHTML += `
        <input type="checkbox" value="${g.kode}"> ${g.nama} <br>
    `;
});

// ==========================
// FORWARD CHAINING
// ==========================
document.getElementById("formGejala").addEventListener("submit", function(e) {
    e.preventDefault();

    let dipilih = [];
    document.querySelectorAll("#listGejala input:checked").forEach(el => {
        dipilih.push(el.value);
    });

    let hasil = [];

    aturan.forEach(rule => {
        let cocok = rule.gejala.every(g => dipilih.includes(g));
        if (cocok) {
            let k = kerusakan.find(k => k.kode === rule.kerusakan);
            hasil.push(k.nama);
        }
    });

    const hasilDiv = document.getElementById("hasil");

    if (hasil.length > 0) {
        hasilDiv.innerHTML = hasil.map(h => "- " + h).join("<br>");
    } else {
        hasilDiv.innerHTML = "Tidak ditemukan kerusakan.";
    }
});