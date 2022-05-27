const catchAsync = function catchAsync(func) {
    // 將 async fun 帶入參數儲存
    return (req, res, next) => {
      //鏈接 catch 統一捕捉錯誤
      func(req, res, next).catch(function (error) {
        return next(error);
      });
    };
  };
  
  module.exports = catchAsync;
  