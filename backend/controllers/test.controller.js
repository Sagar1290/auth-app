const testController = (req, res) => {
    console.log(req.body)
    res.send("hey you are in testing controller!!")
}

export default testController