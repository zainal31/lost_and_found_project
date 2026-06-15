export default function ModalKlaim() {
	return (
		<div className="fixed inset-0 bg-black/50 items-center justify-center z-50 p-4 flex">
			<div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
				<header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
					<div>
						<h3 className="font-bold text-gray-900 text-xl">Ajukan Klaim Kepemilikan</h3>
						<p className="text-xs text-gray-500 mt-0.5">Selesaikan form verifikasi berikut untuk direview oleh admin.</p>
					</div>
					<button className="text-gray-400 hover:text-gray-600 font-bold text-2xl outline-none">&times;</button>
				</header>

				<form className="p-6 space-y-5 flex-grow overflow-y-auto" action="#" method="POST" encType="multipart/form-data">
					<div className="space-y-4">
						<h4 className="text-xs font-bold text-kampus-blue uppercase tracking-wider border-b border-blue-100 pb-1">Langkah 1: Pertanyaan Verifikasi </h4>
						<div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-100">
							<label htmlFor="jawaban_verifikasi" className="block text-sm font-semibold text-amber-900 mb-1">
								Pertanyaan dari Penemu:{" "}
							</label>
							<p className="text-sm text-amber-800 italic mb-2">"Apa warna gantungan kunci atau ada stiker apa di kuncinya?" </p>
							<input
								id="jawaban_verifikasi"
								name="jawaban_verifikasi"
								type="text"
								required
								className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-kampus-blue outline-none"
								placeholder="Ketik jawaban Anda disini... "
							/>
						</div>
						<div>
							<label htmlFor="deskripsi_rahasia" className="block text-sm font-semibold text-gray-700 mb-1">
								Deskripsikan Detail yang Tidak Terlihat di Foto <span className="text-red-500">*</span>
							</label>
							<textarea
								id="deskripsi_rahasia"
								name="deskripsi_rahasia"
								rows="3"
								required
								className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-kampus-blue outline-none resize-none"
								placeholder="Contoh: Ada bekas goresan di sisi belakang, isi dokumen di dalam folder tersembunyi, dll... "></textarea>
						</div>
					</div>
					<div className="space-y-4 pt-2">
						<h4 className="text-xs font-bold text-kampus-blue uppercase tracking-wider border-b border-blue-100 pb-1">Langkah 2: Unggah Bukti Pendukung </h4>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-1">Foto Barang Serupa / Bukti Kepemilikan</label>
							<p className="text-[11px] text-gray-500 mb-2">Foto barang dari sudut berbeda sebelum hilang atau nota pembelian resmi.</p>
							<input
								type="file"
								accept="image/*"
								className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-kampus-blue hover:file:bg-gray-200"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-1">
								Foto Kartu Tanda Mahasiswa (KTM) <span className="text-red-500">*</span>
							</label>
							<p className="text-[11px] text-gray-500 mb-2">Wajib diunggah untuk dicocokkan dengan profil akun pelapor Anda.</p>
							<input
								type="file"
								accept="image/*"
								required
								className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-kampus-blue hover:file:bg-gray-200"
							/>
						</div>
					</div>
					<div className="pt-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
						<button type="button" className="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
							Batal
						</button>
						<button type="submit" className="flex-1 bg-kampus-blue text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-900 transition-colors text-sm shadow-md">
							Ajukan Klaim Sekarang
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
