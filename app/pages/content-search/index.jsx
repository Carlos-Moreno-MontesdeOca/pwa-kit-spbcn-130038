import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentSearch = (contentResult) => {
    if (!contentResult) {
        console.log('...Cargando')
    }
    //Different to the excercise example. Used debugger to track where the Data comes from..
    const hits = contentResult.contentResult.hits
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(
        `${getAppOrigin}/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content_search?q=about&client_id=58607e6a-9281-4bb1-ab3d-29bd72a2bea1`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
