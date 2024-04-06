const ShowResult = ({response}) => {
  return (
    <p dangerouslySetInnerHTML={{__html:response}}> </p>
  )
}

export default ShowResult