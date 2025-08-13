
export default function NavigationBar() {
    return (
        <header className='toolbar'>
            <div className="toolbar-wrap">
                <div className="toolbar-upper">
                    <div className="toolbar-logo-wrap"><a href="/"><img src="https://cdn-dantats.stunning.kr/static/common/logo/bi-loud.png.small?s=200x48&t=crop&q=80&f=webp" alt="이담리테일" /></a></div>
                    <div className="toolbar-search-wrap">
                        <div className="toolbar-search"></div>
                    </div>
                    <div className="toolbar-utils-wrap">
                        <a className="toolbar-utils__mass-order-inquiry" href="">📦 대량발주 문의</a>
                        <a href="" className="toolbar-utils__print-inquiry">✒️ 인쇄/각인 문의</a>
                        <a href="" className="toolbar-utils__sign-in">로그인</a>
                        <a href="" className="toolbar-utils__sign-out">로그아웃</a>
                        <a href="" className="toolbar-utils__register">회원가입</a>
                        <a href="" className="toolbar-utils__my-page">마이페이지</a>
                    </div>
                </div>
                <div className="toolbar-lower">
                    <div className="toolbar-categories-wrap">
                        <div className="toolbar-categories__category-wrap">
                            <h3 className="toolbar-categories__category-title">카테고리</h3>
                            <div className="toolbar-categories__category-content"></div>
                        </div>
                        <div className="toolbar-categories__promotional-wrap">
                            <h3 className="toolbar-categories__promotional-title">🔥 판촉물</h3>
                            <div className="toolbar-categories__promotional-content"></div>
                        </div>
                        <div className="toolbar-categories__charger-wrap">
                            <h3 className="toolbar-categories__charger-title">🔋 충전기/보조배터리</h3>
                            <div className="toolbar-categories__charger-content"></div>
                        </div>
                    </div>
                    <div className="toolbar-action-button-wrap">
                        <a href="" className="toolbar-action-button__console">관리자 콘솔 가기</a>
                        <a href="" className="toolbar-action-button__order">주문서 작성하기</a>
                    </div>
                </div>
            </div>
        </header>
    )
}