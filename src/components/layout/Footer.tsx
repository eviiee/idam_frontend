
export default function Footer() {
    return (
        <footer>
            <div className="footer-wrap">
                <div className="upper">
                    <section className="left">
                        <div className="logo">
                            <img src="https://cdn-dantats.stunning.kr/static/common/logo/bi-loud.png.small?s=200x48&t=crop&q=80&f=webp" alt="이담리테일" />
                            <h5>Boost your business with <b>Idam Retail</b></h5>
                        </div>
                        <div className="biz-info">
                            <p><span>진선영</span><span>(주)이담리테일</span></p>
                            <p><span>사업자번호<span>|</span>502-88-02628</span><span>통신판매<span>|</span>제2022-경기부천-3733호</span></p>
                            <p><span>주소<span>|</span>경기도 부천시 삼작로177번길 64, 3층</span><span>개인정보관리자<span>|</span>진선영</span></p>
                            <p><span>본 사이트에 게재된 상품 이미지를 포함한 모든 컨텐츠의 무단 도용을 금합니다.</span></p>
                            <p><span>Copyright 2022 ⓒ IDAM RETAIL All right reserved.</span></p>
                        </div>
                    </section>
                    <div></div>
                    <section className="right">
                        <a href="">업무 문의 &gt;</a>
                        <div className="customer-service">
                            <h4>고객 센터</h4>
                            <div className="customer-service__info">
                                <p>
                                    <h5>상담 시간</h5>
                                    <span>평일 10:00 ~ 17:00</span>
                                    <span>점심 11:30 ~ 13:30</span>
                                    <small>(주말 및 공휴일 제외)</small>
                                </p>
                                <p>
                                    <h5>연락처</h5>
                                    <span><b>E.</b> idam0621@naver.com</span>
                                    <span><b>T.</b> 1644-6140</span>
                                </p>
                            </div>
                        </div>
                        <p className="bank-account">
                            <h5>입금계좌</h5>
                            <span>신한은행 140-013-967433</span>
                            <span>(주)이담리테일</span>
                        </p>
                    </section>
                </div>
                <div className="lower">
                </div>
            </div>
            <div className="footer-end-wrap">
                <div className="footer-end-content"><span>Powered by PY.</span><span>IDAM RETAIL</span></div>
            </div>
        </footer>
    )
}