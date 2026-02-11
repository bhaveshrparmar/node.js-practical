const commonString = {
    type: String,
    required: [true, "This field is required"],
    trim: true
};

const common = {
    required: [true, "This field is required"]
};

module.exports = { common, commonString };
