<%--
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
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
--%>

<%@ include file="/init.jsp" %>

<div class="container-fluid-1280">
	<div class="lfr-categories-selector-list lfr-tags-selector-list" id="<portlet:namespace />listCategories">
	</div>
</div>

<portlet:resourceURL id="getCategories" var="resourceURL">
	<portlet:param name="vocabularyId" value="<%= String.valueOf(assetCategoriesSelectorDisplayContext.getVocabularyId()) %>" />
</portlet:resourceURL>

<aui:script use="aui-tree-view">
	var emptyFn = function() {
		debugger;

	};

	var vocabularyRootNode = {
		alwaysShowHitArea: true,
		id: 'vocabulary<%= assetCategoriesSelectorDisplayContext.getVocabularyId() %>',
		label: '<%= assetCategoriesSelectorDisplayContext.getVocabularyTitle() %>',
		leaf: false,
		type: 'io'
	};

	new A.TreeView(
		{
			boundingBox: '#<portlet:namespace />listCategories',
			children: [vocabularyRootNode],
			io: {
				cfg: {
					data: emptyFn,
					on: {
						success: emptyFn
					}
				},
				formatter: emptyFn,
				url: '<%= resourceURL %>'
			}
		}
	).render();
</aui:script>