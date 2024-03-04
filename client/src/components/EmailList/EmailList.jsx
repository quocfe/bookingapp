import './emaillist.scss';

const EmailList = () => {
	return (
		<div className="emaillist">
			<div className="secContainer">
				<h4>Tiết kiệm thời gian và tiền bạc!</h4>
				<span>
					Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn
				</span>
				<div className="input">
					<input type="text" placeholder="Địa chỉ e-mail của bạn" />
					<button>Đăng ký</button>
				</div>
			</div>
		</div>
	);
};

export default EmailList;
