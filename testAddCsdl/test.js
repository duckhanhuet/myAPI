var express = require('express');
var User = require('../models/User');
var SinhVien = require('../models/SinhVien');
var Khoa     = require('../models/Khoa');
var PhongBan = require('../models/PhongBan');
var GiangVien= require('../models/GiangVien');
var DiemRenLuyen =require('../models/DiemRenLuyen');
var DiemMonHoc   = require('../models/DiemMonHoc');
var LopMonHoc    = require('../models/LopMonHoc');
var File         = require('../models/File');
var KiHoc        = require('../models/KiHoc');
var ThongBao     = require('../models/ThongBao');
var LopChinh     = require('../models/LopChinh');
module.exports = function (app) {
    //add sv
    // var sv = new SinhVien({tenSinhVien: 'tran minh anh'});
    //
    // sv.save(function (err) {
    //     if (err) return false;
    //
    //     var user = new User({
    //         username: "14020234",
    //         password: '14020234',
    //         UserId: sv._id    // assign the _id from the person
    //     });
    //     user.save(function (err) {
    //         if (err) return false;
    //         // thats it!
    //     });
    // });
    //
    // //add khoa
    // var khoa = new Khoa({tenKhoa:'Cong nghe thong tin'});
    //
    // khoa.save(function (err) {
    //     if (err) return false;
    //
    //     var user = new User({
    //         username: "FIT.UET",
    //         password: '14020234',
    //         UserId: khoa._id,   // assign the _id from the person
    //         role  :'Khoa'
    //     });
    //     user.save(function (err) {
    //         if (err) return false;
    //         // thats it!
    //     });
    // });
    //
    // //add Phong ban
    //
    // var phongban = new PhongBan({tenPhongBan:'Phong Ban 1'});
    //
    // phongban.save(function (err) {
    //     if (err) return false;
    //
    //     var user = new User({
    //         username: "Phongban1",
    //         password: '14020234',
    //         UserId: phongban._id,   // assign the _id from the person
    //         role  :'PhongBan'
    //     });
    //     user.save(function (err) {
    //         if (err) return false;
    //         // thats it!
    //     });
    // });

    //add GiangVien
    var kihoc = new KiHoc({tenKiHoc:'2015-2016'});
    kihoc.save(function (err) {
        if (err) return err;

        var lopmonhoc= new LopMonHoc({tenLopMonHoc:'co so du lieu',thoiGian:'4-5-2016',idKiHoc:kihoc._id});
        //var lopmonhoc2= new LopMonHoc({tenLopMonHoc:'co so du lieu',thoiGian:'4-5-2016',idKiHoc:kihoc._id});
        lopmonhoc.save(function (err) {
            if (err) return err;

            var giangvien = new GiangVien({tenGiangVien:'Tran Ngoc Hung', idLopMonHoc:lopmonhoc._id});

            giangvien.save(function (err) {
                if (err) return false;

                var user = new User({
                    username: "ngochung",
                    password: '14020234',
                    UserId: giangvien._id,   // assign the _id from the person
                    role  :'GiangVien'
                });
                user.save(function (err) {
                    if (err) return false;
                    // thats it!
                });
            });
        })
    })

    var khoa= new Khoa({tenKhoa:'cong nghe thong tin'});
    khoa.save(function (err) {
        if (err) return err;

        var lopchinh= new LopChinh({tenLopChinh:'K59-CLC',idKhoa: khoa._id});
        lopchinh.save(function (err) {
            if (err) return err;

            var sinhvien= new SinhVien({tenSinhVien:'Nguyen Duc Khanh',idLopChinh: lopchinh._id});
            sinhvien.save(function (err) {
                if (err) throw err;
                var user = new User({username:'14020234',password:'14020234',UserId:sinhvien._id});

                user.save(function (err) {
                    if (err) return err;

                })
            })
        })
    })

    // var phongban= new PhongBan({tenPhongBan:'cong tac sinh vien'});
    // phongban.save(function (err) {
    //     if (err) throw err;
    //     var user= new User({username:'ctsv',password:'14020234',UserId:phongban._id});
    //     user.save(function (err) {
    //         if (err) throw err;
    //     })
    // });



    // User
    //     .findOne({ username: '14020234' })
    //     .populate('UserId', 'tenSinhVien') // only return the Persons name
    //     .exec(function (err, user) {
    //         if (err) return handleError(err);
    //
    //         console.log('The UserId is %s', user.UserId.tenSinhVien);
    //         // prints "The creator is Aaron"
    //
    //        // console.log('The UserId age is %s', user.UserId.age);
    //         // prints "The creators age is null'
    //     })

}