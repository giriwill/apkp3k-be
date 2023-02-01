import { Sequelize } from "sequelize";
import Laporan from "../models/LaporanModel.js";

const Op = Sequelize.Op;

export const getLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            order:[
                ['id']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get jumlah menit berdasarkan nip tanggal bulan tahun
export const getHitungLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            attributes: [
                'nip',
                [Sequelize.fn('count', Sequelize.col('nip')), 'count'], 
            ],
            group: ['nip']
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get laporan berdasarkan nip dan tanggal dan bulan dan tahun
export const getLaporanKhusus = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where:{
                nip: req.body.nip,
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get jumlah menit berdasarkan nip tanggal bulan tahun
export const getLaporanSum = async (req, res) => {
    try {
        const response = await Laporan.sum('durasi',{
            where:{
                nip: req.body.nip,
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get laporan bulanan
export const getLaporanBulan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where:{
                nip: req.body.nip,
                bulan: req.body.bulan
            },
            order:[
                ['tanggal']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const saveLaporan = async (req, res) => {
    try {
        const response = await Laporan.create(req.body);
        res.status('201').json({ msg: 'Laporan Berhasil Diinput' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getLaporanById = async (req, res) => {
    try {
        const response = await Laporan.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.json(response);
    } catch (error) {

    }
}

export const deleteLaporan = async (req, res) => {
    try {
        const response = await Laporan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status('201').json({ msg: "Laporan berhasil dihapus" });
    } catch (error) {
        console.log(err.message);
    }
}

export const updateLaporan = async (req, res) => {
    try {
        const response = await Laporan.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status('201').json({ msg: "Data Produk berhasil di ubah" });
    } catch (error) {
        console.log(err.message);
    }
}

export const getLikeLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where: {
                nama: {
                    [Op.like]: '%' + req.params.word + '%'
                }
            }
        });
        res.json(response);
    } catch (error) {
        console.log(err.message);
    }
}