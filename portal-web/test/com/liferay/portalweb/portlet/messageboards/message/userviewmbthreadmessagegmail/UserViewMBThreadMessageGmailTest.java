/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portalweb.portlet.messageboards.message.userviewmbthreadmessagegmail;

import com.liferay.portalweb.portal.BaseTestCase;
import com.liferay.portalweb.portal.util.RuntimeVariables;

/**
 * @author Brian Wing Shun Chan
 */
public class UserViewMBThreadMessageGmailTest extends BaseTestCase {
	public void testUserViewMBThreadMessageGmail() throws Exception {
		selenium.open("/web/guest/home/");
		selenium.clickAt("link=Site Name", RuntimeVariables.replace(""));
		selenium.waitForPageToLoad("30000");
		selenium.saveScreenShotAndSource();
		Thread.sleep(60000);

		for (int second = 0;; second++) {
			if (second >= 60) {
				fail("timeout");
			}

			try {
				if (selenium.isVisible("link=Message Boards Test Page")) {
					break;
				}
			}
			catch (Exception e) {
			}

			Thread.sleep(1000);
		}

		selenium.saveScreenShotAndSource();
		selenium.clickAt("link=Message Boards Test Page",
			RuntimeVariables.replace("Message Boards Test Page"));
		selenium.waitForPageToLoad("30000");
		selenium.saveScreenShotAndSource();
		assertEquals(RuntimeVariables.replace("MB Category Name"),
			selenium.getText("//a/strong"));
		selenium.clickAt("//a/strong",
			RuntimeVariables.replace("MB Category Name"));
		selenium.waitForPageToLoad("30000");
		selenium.saveScreenShotAndSource();
		assertEquals(RuntimeVariables.replace("MB Message Subject"),
			selenium.getText("//td[1]/a"));
		assertEquals(RuntimeVariables.replace("2"),
			selenium.getText("//td[4]/a"));
		selenium.clickAt("//td[1]/a",
			RuntimeVariables.replace("MB Message Subject"));

		for (int second = 0;; second++) {
			if (second >= 60) {
				fail("timeout");
			}

			try {
				if (selenium.isVisible(
							"//div[5]/table/tbody/tr[1]/td[2]/div[1]/div/a/strong")) {
					break;
				}
			}
			catch (Exception e) {
			}

			Thread.sleep(1000);
		}

		selenium.saveScreenShotAndSource();
		assertEquals(RuntimeVariables.replace(
				"exact:Re: [MB Category Name] MB Message Subject"),
			selenium.getText(
				"//div[5]/table/tbody/tr[1]/td[2]/div[1]/div/a/strong"));
		assertTrue(selenium.isPartialText(
				"//div[5]/table/tbody/tr[1]/td[2]/div[2]",
				"MB Message Email Reply"));
		assertEquals(RuntimeVariables.replace("userfn userln"),
			selenium.getText("//div[5]/table/tbody/tr[1]/td[1]/div/a/span[2]"));
		assertEquals(RuntimeVariables.replace("exact:Posts: 1"),
			selenium.getText("//div[5]/table/tbody/tr[1]/td[1]/div/div/div[2]"));
	}
}