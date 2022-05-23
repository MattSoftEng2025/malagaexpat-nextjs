const formatDate = (input) => {
    const d = new Date(input);
    let date = d.toLocaleDateString('en-us', { day: 'numeric' })
    let month = d.toLocaleDateString('en-us', { month: 'short' })
    let year = d.toLocaleDateString('en-us', { year: 'numeric' })
    return `${date} ${month} ${year}`
}

const postedOrLastUpdatedText = (lastUpdated, publishDate) => {
    return lastUpdated ? `Last updated on ${formatDate(lastUpdated)}` : `Published on ${formatDate(publishDate)}`
}

export { formatDate, postedOrLastUpdatedText }