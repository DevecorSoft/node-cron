(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['luxon'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('luxon'), require('child_process'));
	} else {
		root.Cron = factory(root.luxon);
	}
})(this, function (luxon, childProcess) {
	var exports = {};
	var spawn = childProcess && childProcess.spawn;
	const CronTime = require('./time')(luxon);
	const CronJob = require('./job')(CronTime, spawn);

	exports.job = (
		cronTime,
		onTick,
		onComplete,
		startNow,
		timeZone,
		context,
		runOnInit,
		utcOffset,
		unrefTimeout
	) =>
		new CronJob(
			cronTime,
			onTick,
			onComplete,
			startNow,
			timeZone,
			context,
			runOnInit,
			utcOffset,
			unrefTimeout
		);

	exports.time = (cronTime, timeZone) => new CronTime(cronTime, timeZone);

	exports.sendAt = cronTime => exports.time(cronTime).sendAt();

	exports.timeout = cronTime => exports.time(cronTime).getTimeout();

	exports.CronJob = CronJob;
	exports.CronTime = CronTime;

	return exports;
});
