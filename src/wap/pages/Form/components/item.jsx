
const Item = (props) => {
    let { data } = props
    return <>
        {data.map((item) => <div className={style.bottomInfo}>
            <div className={style.bottomInfoItem}>
                {
                    item.items.map(iitem => <div className={style.item}>
                        <div className={style.key}>{t('CUST.' + iitem.name)}</div>
                        <div className={style.val}>{iitem.value}</div>
                    </div>)
                }
            </div>
        </div>)}
    </>

}