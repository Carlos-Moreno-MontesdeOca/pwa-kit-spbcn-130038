import React from 'react'
import fetch from 'cross-fetch'

import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentDetails = ({contentResult}) => {
    if (!contentResult) {
        return <div>...Cargando</div>
    }
    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
}

ContentDetails.getProps = async ({params}) => {
    let contentResult
    const result = await fetch(
        `${getAppOrigin}/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content/${params.id}?client_id=58607e6a-9281-4bb1-ab3d-29bd72a2bea1`
    )
    if (result.ok) {
        contentResult = await result.json()
    } else {
        const error = await result.json()
        throw new HTTPError(result.status, error.fault.message)
    }
    return {contentResult}
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails
