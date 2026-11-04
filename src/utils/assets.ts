/**
 * Asset URL helper to ensure seamless relative paths across dev and production (e.g. GitHub Pages)
 */
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (!cleanPath.startsWith('images/') && !cleanPath.startsWith('design/')) {
    cleanPath = `images/${cleanPath}`;
  }
  return `${cleanBase}${cleanPath}`;
};

export const ASSETS = {
  // Scene Backgrounds
  backgrounds: {
    dongPhu: getAssetUrl('images/backgrounds/hang-dong-tien.png'),
    tuLuyen: getAssetUrl('images/backgrounds/thien-dong.png'),
    luyenDan: getAssetUrl('images/backgrounds/phong-luyen-dan.png'),
    linhDien: getAssetUrl('images/backgrounds/vuon-thao-duoc.png'),
    phuongThi: getAssetUrl('images/backgrounds/cho-tien-hiep.png'),
  },

  // Currencies
  currency: {
    linhThach: getAssetUrl('images/bieu_tuong_tien_te/linh_thach.png'),
    ngocBich: getAssetUrl('images/bieu_tuong_tien_te/ngoc_bich.png'),
    nguyenBao: getAssetUrl('images/bieu_tuong_tien_te/nguyen_bao.png'),
    theLuc: getAssetUrl('images/bieu_tuong_tien_te/the_luc.png'),
  },

  // Bottom Navigation
  nav: {
    dongPhu: getAssetUrl('images/nav/dong_phu.png'),
    tuLuyen: getAssetUrl('images/nav/tu_luyen.png'),
    luyenDan: getAssetUrl('images/nav/luyen_dan.png'),
    linhDien: getAssetUrl('images/nav/linh_dien.png'),
    phuongThi: getAssetUrl('images/nav/phuong_thi.png'),
  },

  // Khung viền UI (từ assets/images/khung)
  khung: {
    thongTinNhanVat: getAssetUrl('images/khung/01_khung_thong_tin_nhan_vat.png'),
    nhiemVu: getAssetUrl('images/khung/02_khung_nhiem_vu.png'),
    bannerSuKien: getAssetUrl('images/khung/03_banner_su_kien.png'),
    thanhNgocBich: getAssetUrl('images/khung/04_thanh_ngoc_bich.png'),
    thanhLinhThach: getAssetUrl('images/khung/05_thanh_linh_thach.png'),
    thanhNguyenBao: getAssetUrl('images/khung/06_thanh_nguyen_bao.png'),
    thanhTheLuc: getAssetUrl('images/khung/07_thanh_the_luc.png'),
  },

  // Header & General UI
  ui: {
    avatarTuSi: getAssetUrl('images/nhan_vat/tu_si_nam.png'),
    khungAvatar: getAssetUrl('images/ui/nhan_vat_thong_tin.png'),
    iconThu: getAssetUrl('images/ui/icon_thu.png'),
    iconThongBao: getAssetUrl('images/ui/icon_thong_bao.png'),
    iconCaiDat: getAssetUrl('images/ui/icon_cai_dat.png'),
    bangNhiemVu: getAssetUrl('images/ui/bang_nhiem_vu.png'),
    bannerSuKien: getAssetUrl('images/ui/banner_su_kien.png'),
    khungThongTinNhanVat: getAssetUrl('images/khung_trong_khong_text/khung_thong_tin_nhan_vat.png'),
    nutChucNang: getAssetUrl('images/khung_trong_khong_text/nut_chuc_nang.png'),
    oVatPham: getAssetUrl('images/khung_trong_khong_text/o_vat_pham.png'),
  },

  // Dong Phu Buildings & Labels
  dongPhu: {
    buildings: {
      daiTuLuyen: getAssetUrl('images/cong_trinh/dai_tu_luyen.png'),
      hoLinhNgu: getAssetUrl('images/cong_trinh/ho_linh_ngu.png'),
      khoChua: getAssetUrl('images/cong_trinh/kho_chua.png'),
      linhDien: getAssetUrl('images/cong_trinh/linh_dien_4_o.png'),
      phongLuyenDan: getAssetUrl('images/cong_trinh/phong_luyen_dan.png'),
      tranTuLinh: getAssetUrl('images/cong_trinh/tran_tu_linh.png'),
    },
    labels: {
      daiTuLuyen: getAssetUrl('images/nhan/phong_dai_tu_luyen.png'),
      hoLinhNgu: getAssetUrl('images/nhan/phong_ho_linh_ngu.png'),
      khoChua: getAssetUrl('images/nhan/phong_kho_chua.png'),
      linhDien: getAssetUrl('images/nhan/phong_linh_dien.png'),
      phongLuyenDan: getAssetUrl('images/nhan/phong_luyen_dan.png'),
      tranTuLinh: getAssetUrl('images/nhan/phong_tran_tu_linh.png'),
    },
  },

  // Tu Luyen
  tuLuyen: {
    nhanVat: getAssetUrl('images/tu_luyen/cat_nguyen_goc/nhan_vat_thien_dinh.png'),
    nutVanKhi: getAssetUrl('images/tu_luyen/cat_nguyen_goc/nut_van_khi.png'),
    nutBeQuan: getAssetUrl('images/tu_luyen/cat_nguyen_goc/nut_be_quan.png'),
    nutThamNgo: getAssetUrl('images/tu_luyen/cat_nguyen_goc/nut_tham_ngo.png'),
    nutDoiCongPhap: getAssetUrl('images/tu_luyen/cat_nguyen_goc/nut_doi_cong_phap.png'),
    iconCongPhap: getAssetUrl('images/tu_luyen/cat_nguyen_goc/icon_cong_phap.png'),
    khungCongPhap: getAssetUrl('images/tu_luyen/cat_nguyen_goc/khung_cong_phap.png'),
    khungDuKien: getAssetUrl('images/tu_luyen/cat_nguyen_goc/khung_du_kien.png'),
    khungTuVi: getAssetUrl('images/tu_luyen/cat_nguyen_goc/khung_tu_vi_dot_pha.png'),
    thanhTuVi: getAssetUrl('images/tu_luyen/cat_nguyen_goc/thanh_tu_vi.png'),
    tieuDe: getAssetUrl('images/tu_luyen/cat_nguyen_goc/tieu_de.png'),
  },

  // Linh Dien
  linhDien: {
    nhanVat: getAssetUrl('images/linh_dien/cat_nguyen_goc/nhan_vat_tuoi_cay.png'),
    nutTuoi: getAssetUrl('images/linh_dien/cat_nguyen_goc/nut_tuoi.png'),
    nutBonLinhThach: getAssetUrl('images/linh_dien/cat_nguyen_goc/nut_bon_linh_thach.png'),
    nutThuHoach: getAssetUrl('images/linh_dien/cat_nguyen_goc/nut_thu_hoach.png'),
    plants: {
      giong: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_giong.png'),
      dangTuoi: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_dang_tuoi.png'),
      hoaTim: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_hoa_tim.png'),
      hoaXanh: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_hoa_xanh.png'),
      laXanh: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_la_xanh.png'),
      nhanSam: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_nhan_sam.png'),
      nhanSam2: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_nhan_sam_2.png'),
      quaDo: getAssetUrl('images/linh_dien/cat_nguyen_goc/cay_qua_do.png'),
      linhThao: getAssetUrl('images/linh_dien/cat_nguyen_goc/anh_linh_thao.png'),
    },
    khungThongTin: getAssetUrl('images/linh_dien/cat_nguyen_goc/khung_thong_tin_linh_thao.png'),
    bangTrangThai: getAssetUrl('images/linh_dien/cat_nguyen_goc/bang_trang_thai_cay.png'),
  },

  // Luyen Dan
  luyenDan: {
    nhanVat: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nhan_vat_luyen_dan.png'),
    loDan: getAssetUrl('images/luyen_dan/cat_nguyen_goc/lo_dan.png'),
    nutBatDau: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nut_bat_dau_luyen_dan.png'),
    cuongDoLua: getAssetUrl('images/luyen_dan/cat_nguyen_goc/thanh_cuong_do_lua.png'),
    soLanLuyen: getAssetUrl('images/luyen_dan/cat_nguyen_goc/so_lan_luyen.png'),
    steps: {
      tinhLuyen: getAssetUrl('images/luyen_dan/cat_nguyen_goc/buoc_tinh_luyen.png'),
      dungHop: getAssetUrl('images/luyen_dan/cat_nguyen_goc/buoc_dung_hop.png'),
      ngungDan: getAssetUrl('images/luyen_dan/cat_nguyen_goc/buoc_ngung_dan.png'),
    },
    materials: {
      linhThach: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nguyen_lieu_linh_thach.png'),
      linhChi: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nguyen_lieu_linh_chi.png'),
      nhanSam: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nguyen_lieu_nhan_sam.png'),
      hoaTim: getAssetUrl('images/luyen_dan/cat_nguyen_goc/nguyen_lieu_hoa_tim.png'),
    },
    iconTuKhiDan: getAssetUrl('images/luyen_dan/cat_nguyen_goc/icon_tu_khi_dan.png'),
  },

  // Phuong Thi
  phuongThi: {
    nhanVat: getAssetUrl('images/phuong_thi/cat_nguyen_goc/nhan_vat_giua.png'),
    nutMua: getAssetUrl('images/phuong_thi/cat_nguyen_goc/nut_mua.png'),
    shops: {
      linhThao: getAssetUrl('images/phuong_thi/cat_nguyen_goc/shop_linh_thao.png'),
      danDuoc: getAssetUrl('images/phuong_thi/cat_nguyen_goc/shop_dan_duoc.png'),
      phapKhi: getAssetUrl('images/phuong_thi/cat_nguyen_goc/shop_phap_khi.png'),
      congPhap: getAssetUrl('images/phuong_thi/cat_nguyen_goc/shop_cong_phap.png'),
    },
    slots: {
      linhThao: getAssetUrl('images/phuong_thi/cat_nguyen_goc/o_linh_thao.png'),
      danDuoc: getAssetUrl('images/phuong_thi/cat_nguyen_goc/o_dan_duoc.png'),
      phapKhi: getAssetUrl('images/phuong_thi/cat_nguyen_goc/o_phap_khi.png'),
      congPhap: getAssetUrl('images/phuong_thi/cat_nguyen_goc/o_cong_phap.png'),
    },
  },
};

